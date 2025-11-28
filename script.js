/**
 * SOENA - Presentación Comercial
 * Script de Navegación y Control
 * Autor: Claude Code
 * Última actualización: 2025
 */

class SlidePresentation {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isTransitioning = false;

        // Elementos DOM
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.slideNumber = document.querySelector('.slide-number .current');
        this.totalNumber = document.querySelector('.slide-number .total');
        this.progressDots = document.querySelector('.progress-dots');

        // Estados
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    /**
     * Inicializar presentación
     */
    init() {
        this.updateSlideNumber();
        this.createProgressDots();
        this.attachEventListeners();
        this.log('Presentación inicializada');
    }

    /**
     * Adjuntar event listeners
     */
    attachEventListeners() {
        // Navegación con teclado
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Navegación con mouse
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Navegación con touch/swipe
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e), false);
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e), false);

        // Prevenir recarga accidental
        window.addEventListener('beforeunload', (e) => {
            if (this.currentSlide > 0) {
                e.preventDefault();
                e.returnValue = '';
            }
        });
    }

    /**
     * Manejo de teclado
     */
    handleKeyboard(e) {
        if (this.isTransitioning) return;

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'PageDown':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'PageUp':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides - 1);
                break;
            case 'f':
            case 'F':
                e.preventDefault();
                this.toggleFullscreen();
                break;
        }
    }

    /**
     * Manejo de touch/swipe
     */
    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
    }

    /**
     * Detectar swipe
     */
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe izquierda = siguiente slide
                this.nextSlide();
            } else {
                // Swipe derecha = slide anterior
                this.prevSlide();
            }
        }
    }

    /**
     * Siguiente slide
     */
    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    /**
     * Slide anterior
     */
    prevSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    /**
     * Ir a slide específico
     */
    goToSlide(index) {
        if (this.isTransitioning) return;

        // Validar índice
        if (index < 0 || index >= this.totalSlides) return;

        // Evitar transición a mismo slide
        if (index === this.currentSlide) return;

        this.isTransitioning = true;

        // Remover clase active del slide actual
        this.slides[this.currentSlide].classList.remove('active');

        // Actualizar índice
        this.currentSlide = index;

        // Añadir clase active al nuevo slide
        this.slides[this.currentSlide].classList.add('active');

        // Actualizar UI
        this.updateSlideNumber();
        this.updateProgressDots();
        this.updateNavButtons();

        // Anunciar para screen readers
        this.announceSlide();

        // Log
        this.log(`Slide ${this.currentSlide + 1} / ${this.totalSlides}`);

        // Permitir siguiente transición después de animación
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }

    /**
     * Actualizar número de slide
     */
    updateSlideNumber() {
        this.slideNumber.textContent = this.currentSlide + 1;
        this.totalNumber.textContent = this.totalSlides;
    }

    /**
     * Actualizar dots de progreso
     */
    updateProgressDots() {
        const dots = document.querySelectorAll('.progress-dots .dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    /**
     * Actualizar estado de botones
     */
    updateNavButtons() {
        // Botón anterior
        if (this.currentSlide === 0) {
            this.prevBtn.disabled = true;
        } else {
            this.prevBtn.disabled = false;
        }

        // Botón siguiente
        if (this.currentSlide === this.totalSlides - 1) {
            this.nextBtn.disabled = true;
        } else {
            this.nextBtn.disabled = false;
        }
    }

    /**
     * Crear dots de progreso clickeables
     */
    createProgressDots() {
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');

            dot.setAttribute('role', 'button');
            dot.setAttribute('tabindex', '0');
            dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);

            dot.addEventListener('click', () => this.goToSlide(i));
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.goToSlide(i);
                }
            });

            this.progressDots.appendChild(dot);
        }

        this.updateNavButtons();
    }

    /**
     * Anunciar slide actual para lectores de pantalla
     */
    announceSlide() {
        const slideTitle = this.slides[this.currentSlide].getAttribute('aria-label');
        const announcement = `Slide ${this.currentSlide + 1} de ${this.totalSlides}: ${slideTitle}`;

        // Crear elemento aria-live si no existe
        let ariaLive = document.querySelector('[aria-live="polite"]');
        if (!ariaLive) {
            ariaLive = document.createElement('div');
            ariaLive.setAttribute('aria-live', 'polite');
            ariaLive.setAttribute('aria-atomic', 'true');
            ariaLive.classList.add('sr-only');
            document.body.appendChild(ariaLive);
        }

        ariaLive.textContent = announcement;
    }

    /**
     * Toggle pantalla completa
     */
    toggleFullscreen() {
        const doc = document.documentElement;

        if (doc.requestFullscreen) {
            doc.requestFullscreen().catch(() => {
                this.log('No se pudo activar pantalla completa');
            });
        } else if (doc.webkitRequestFullscreen) {
            doc.webkitRequestFullscreen();
        }
    }

    /**
     * Función de logging (debug)
     */
    log(message) {
        console.log(`[SOENA] ${message}`);
    }
}

/**
 * Inicializar cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia de presentación
    window.presentation = new SlidePresentation();

    // Mensajes de bienvenida
    console.log('%c🎯 SOENA - Presentación Comercial', 'font-size: 18px; font-weight: bold; color: #10B981;');
    console.log('%cNavegación:', 'font-weight: bold;');
    console.log('⬅️  ➡️  Flechas del teclado');
    console.log('⎵  Spacebar para siguiente slide');
    console.log('🏠 End para ir a último slide');
    console.log('💾 Ctrl+P para imprimir');
    console.log('F Pantalla completa');
});

// Soporte para impresión
window.addEventListener('beforeprint', () => {
    console.log('Preparando para impresión...');
});

window.addEventListener('afterprint', () => {
    console.log('Impresión completada');
});
