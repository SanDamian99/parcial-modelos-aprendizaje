// js/reinforcement-helper.js
// Modal interactivo de ayuda visual para Programas de Reforzamiento
// Se usa en quiz.js y game.js cuando las preguntas involucran programas de reforzamiento.

const ReinforcementHelper = {
    isOpen: false,
    activeTab: 'rf',

    // Detecta si una pregunta involucra programas de reforzamiento
    shouldShow(concept) {
        if (!concept) return false;
        const lower = concept.toLowerCase();
        return lower.includes('razón fija') || lower.includes('razón variable') ||
            lower.includes('razon fija') || lower.includes('razon variable') ||
            lower.includes('intervalo fijo') || lower.includes('intervalo variable');
    },

    // Crea el botón 💡
    createButton(parent) {
        const existing = parent.querySelector('.rh-btn');
        if (existing) existing.remove();
        const btn = document.createElement('button');
        btn.className = 'rh-btn';
        btn.innerHTML = '💡 Recordar teoría';
        btn.type = 'button';
        btn.onclick = (e) => { e.stopPropagation(); this.openModal(); };
        parent.appendChild(btn);
    },

    openModal() {
        if (this.isOpen) return;
        this.isOpen = true;
        const overlay = document.createElement('div');
        overlay.id = 'rhOverlay';
        overlay.className = 'rh-overlay';
        overlay.innerHTML = `
      <div class="rh-modal">
        <div class="rh-header">
          <h3>Programas de Reforzamiento</h3>
          <button class="rh-close" onclick="ReinforcementHelper.closeModal()">✕</button>
        </div>
        <div class="rh-tabs">
          <button class="rh-tab active" data-tab="rf">Razón Fija</button>
          <button class="rh-tab" data-tab="rv">Razón Variable</button>
          <button class="rh-tab" data-tab="if">Intervalo Fijo</button>
          <button class="rh-tab" data-tab="iv">Intervalo Variable</button>
        </div>
        <div class="rh-body" id="rhBody"></div>
      </div>`;
        document.body.appendChild(overlay);

        overlay.querySelectorAll('.rh-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                overlay.querySelectorAll('.rh-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.activeTab = tab.dataset.tab;
                this.renderTab();
            });
        });
        this.renderTab();
    },

    closeModal() {
        const overlay = document.getElementById('rhOverlay');
        if (overlay) overlay.remove();
        this.isOpen = false;
        this._clearTimers();
    },

    _timers: [],
    _clearTimers() {
        this._timers.forEach(t => clearInterval(t));
        this._timers = [];
    },

    renderTab() {
        this._clearTimers();
        const body = document.getElementById('rhBody');
        if (!body) return;

        if (this.activeTab === 'rf') this._renderRF(body);
        else if (this.activeTab === 'rv') this._renderRV(body);
        else if (this.activeTab === 'if') this._renderIF(body);
        else if (this.activeTab === 'iv') this._renderIV(body);
    },

    // ─── Razón Fija ───
    _rfCount: 0,
    _renderRF(body) {
        this._rfCount = 0;
        body.innerHTML = `
      <h4>Razón Fija — Reforzamiento cada N respuestas</h4>
      <p class="rh-desc">El reforzador llega siempre después del <strong>mismo número</strong> de respuestas. Ejemplo: comisión por cada 5 ventas cerradas.</p>
      <div class="rh-demo">
        <div class="rh-boxes" id="rfBoxes">${'<div class="rh-box"></div>'.repeat(5)}</div>
        <div class="rh-star hidden" id="rfStar">⭐</div>
      </div>
      <button class="rh-action" id="rfBtn">Hacer clic (Producir respuesta)</button>
      <p class="rh-counter">Respuestas: <span id="rfCounter">0</span>/5</p>`;
        document.getElementById('rfBtn').addEventListener('click', () => {
            this._rfCount++;
            const boxes = document.querySelectorAll('#rfBoxes .rh-box');
            if (this._rfCount <= 5) boxes[this._rfCount - 1].classList.add('filled');
            document.getElementById('rfCounter').textContent = Math.min(this._rfCount, 5);
            if (this._rfCount >= 5) {
                document.getElementById('rfStar').classList.remove('hidden');
                setTimeout(() => {
                    this._rfCount = 0;
                    boxes.forEach(b => b.classList.remove('filled'));
                    document.getElementById('rfStar').classList.add('hidden');
                    document.getElementById('rfCounter').textContent = '0';
                }, 1000);
            }
        });
    },

    // ─── Razón Variable ───
    _rvCount: 0, _rvTarget: 0,
    _renderRV(body) {
        this._rvCount = 0;
        this._rvTarget = Math.floor(Math.random() * 7) + 1;
        body.innerHTML = `
      <h4>Razón Variable — Reforzamiento impredecible</h4>
      <p class="rh-desc">No sabes cuántos intentos necesitas. Genera la conducta <strong>más resistente a la extinción</strong>. Ejemplo: redes sociales — a veces hay likes, a veces no.</p>
      <div class="rh-demo">
        <div class="rh-star hidden" id="rvStar">⭐ ¡Reforzador!</div>
      </div>
      <button class="rh-action" id="rvBtn">Intentar</button>
      <p class="rh-counter">Intentos: <span id="rvCounter">0</span> | ¿Cuándo caerá? 🤷</p>`;
        document.getElementById('rvBtn').addEventListener('click', () => {
            this._rvCount++;
            document.getElementById('rvCounter').textContent = this._rvCount;
            if (this._rvCount >= this._rvTarget) {
                document.getElementById('rvStar').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('rvStar').classList.add('hidden');
                    this._rvCount = 0;
                    this._rvTarget = Math.floor(Math.random() * 7) + 1;
                    document.getElementById('rvCounter').textContent = '0';
                }, 1200);
            }
        });
    },

    // ─── Intervalo Fijo ───
    _renderIF(body) {
        body.innerHTML = `
      <h4>Intervalo Fijo — Reforzamiento cada T segundos</h4>
      <p class="rh-desc">El tiempo determina cuándo está disponible el reforzador, <strong>no tus respuestas</strong>. Ejemplo: el salario mensual.</p>
      <div class="rh-demo">
        <div class="rh-progress-bar"><div class="rh-progress-fill" id="ifBar" style="width:0%"></div></div>
        <div class="rh-star hidden" id="ifStar">⭐ ¡Salario!</div>
      </div>
      <button class="rh-action" id="ifBtn" disabled>Hacer clic (no sirve de nada)</button>
      <p class="rh-counter">Tiempo: <span id="ifTime">0</span>/5s — tus clics no aceleran nada</p>`;
        let elapsed = 0;
        const timer = setInterval(() => {
            elapsed++;
            const bar = document.getElementById('ifBar');
            const timeEl = document.getElementById('ifTime');
            if (!bar) { clearInterval(timer); return; }
            bar.style.width = (elapsed / 5 * 100) + '%';
            timeEl.textContent = elapsed;
            if (elapsed >= 5) {
                document.getElementById('ifStar').classList.remove('hidden');
                setTimeout(() => {
                    elapsed = 0;
                    bar.style.width = '0%';
                    timeEl.textContent = '0';
                    const star = document.getElementById('ifStar');
                    if (star) star.classList.add('hidden');
                }, 1000);
            }
        }, 1000);
        this._timers.push(timer);
    },

    // ─── Intervalo Variable ───
    _renderIV(body) {
        let target = Math.floor(Math.random() * 7) + 2;
        body.innerHTML = `
      <h4>Intervalo Variable — Tiempo impredecible</h4>
      <p class="rh-desc">No sabes cuándo llegará el reforzador. Ejemplo: revisar el correo — a veces hay algo interesante, a veces no.</p>
      <div class="rh-demo">
        <div class="rh-progress-bar"><div class="rh-progress-fill" id="ivBar" style="width:0%"></div></div>
        <div class="rh-star hidden" id="ivStar">⭐ ¡Sorpresa!</div>
      </div>
      <button class="rh-action" id="ivBtn" disabled>Esperar...</button>
      <p class="rh-counter">¿Cuándo será? Intervalo actual desconocido...</p>`;
        let elapsed = 0;
        const timer = setInterval(() => {
            elapsed++;
            const bar = document.getElementById('ivBar');
            if (!bar) { clearInterval(timer); return; }
            bar.style.width = (elapsed / target * 100) + '%';
            if (elapsed >= target) {
                document.getElementById('ivStar').classList.remove('hidden');
                setTimeout(() => {
                    elapsed = 0;
                    target = Math.floor(Math.random() * 7) + 2;
                    bar.style.width = '0%';
                    const star = document.getElementById('ivStar');
                    if (star) star.classList.add('hidden');
                }, 1000);
            }
        }, 1000);
        this._timers.push(timer);
    }
};
