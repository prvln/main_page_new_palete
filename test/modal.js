// полифилл CustomEven для IE11
(function () {
    if (typeof window.CustomEvent === "function") return false;
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    window.CustomEvent = CustomEvent;
    })();

    $Modal = function (options) {
    var
        _elemModal,
        _eventShowModal,
        _eventHideModal,
        _hiding = false,
        _destroyed = false,
        _animationSpeed = 200;

    function _createModal(options) {
        var
        elemModal = document.createElement('div'),
        ModalTemplate = '<div class="Modal__backdrop" data-dismiss="Modal"><div class="Modal__content"><div class="Modal__header"><div class="Modal__title" data-Modal="title">{{title}}</div><span class="Modal__btn-close" data-dismiss="Modal" title="Закрыть">×</span></div><div class="Modal__body" data-Modal="content">{{content}}</div>{{footer}}</div></div>',
        ModalFooterTemplate = '<div class="Modal__footer">{{buttons}}</div>',
        ModalButtonTemplate = '<button type="button" class="{{button_class}}" data-handler={{button_handler}}>{{button_text}}</button>',
        ModalHTML,
        ModalFooterHTML = '';

        elemModal.classList.add('Modal');
        ModalHTML = ModalTemplate.replace('{{title}}', options.title || 'Новое окно');
        ModalHTML = ModalHTML.replace('{{content}}', options.content || '');
        if (options.footerButtons) {
        for (var i = 0, length = options.footerButtons.length; i < length; i++) {
            var ModalFooterButton = ModalButtonTemplate.replace('{{button_class}}', options.footerButtons[i].class);
            ModalFooterButton = ModalFooterButton.replace('{{button_handler}}', options.footerButtons[i].handler);
            ModalFooterButton = ModalFooterButton.replace('{{button_text}}', options.footerButtons[i].text);
            ModalFooterHTML += ModalFooterButton;
        }
        ModalFooterHTML = ModalFooterTemplate.replace('{{buttons}}', ModalFooterHTML);
        }
        ModalHTML = ModalHTML.replace('{{footer}}', ModalFooterHTML);
        elemModal.innerHTML = ModalHTML;
        document.body.appendChild(elemModal);
        return elemModal;
    }

    function _showModal() {
        if (!_destroyed && !_hiding) {
        _elemModal.classList.add('Modal__show');
        document.dispatchEvent(_eventShowModal);
        }
    }

    function _hideModal() {
        _hiding = true;
        _elemModal.classList.remove('Modal__show');
        _elemModal.classList.add('Modal__hiding');
        setTimeout(function () {
        _elemModal.classList.remove('Modal__hiding');
        _hiding = false;
        }, _animationSpeed);
        document.dispatchEvent(_eventHideModal);
    }

    function _handlerCloseModal(e) {
        if (e.target.dataset.dismiss === 'Modal') {
        _hideModal();
        }
    }

    _elemModal = _createModal(options || {});


    _elemModal.addEventListener('click', _handlerCloseModal);
    _eventShowModal = new CustomEvent('show.Modal', { detail: _elemModal });
    _eventHideModal = new CustomEvent('hide.Modal', { detail: _elemModal });

    return {
        show: _showModal,
        hide: _hideModal,
        destroy: function () {
        _elemModal.parentElement.removeChild(_elemModal),
            _elemModal.removeEventListener('click', _handlerCloseModal),
            destroyed = true;
        },
        setContent: function (html) {
        _elemModal.querySelector('[data-Modal="content"]').innerHTML = html;
        },
        setTitle: function (text) {
        _elemModal.querySelector('[data-Modal="title"]').innerHTML = text;
        }
    }
    };

    (function () {
    // создадим модальное окно 1
    var Modal1 = $Modal({
        title: 'Модальное окно 1',
        content: 'Содержимое модального окна 1'
    });
    // создадим модальное окно 2
    var Modal2 = $Modal({
        title: 'Модальное окно 2',
        content: 'Содержимое модального окна 2'
    });
    // при клике по кнопке #show-Modal-1
    document.addEventListener('click', function (e) {
        if (e.target.dataset.toggle === 'Modal-1') {
        // отобразим модальное окно N1
        Modal1.show();
        } else if (e.target.dataset.toggle === 'Modal-2') {
        // отобразим модальное окно N2
        Modal2.show();
        }
    });
    })();