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

  var Modal1 = $Modal({
      title: 'Введение в разработку программного обеспечения',
      content: '<p><b>Навыки, которые вы получите:</b><ul><li>Работа с терминалом (bash)</li><li>Основы C</li><li>Разработка и применение алгоритмов</li><li>Работа с компилятором</li><li>Программирование на C/C++</li></ul><b>Инструменты, которые вы научитесь использовать:</b><ul><li>make</li><li>gcc/g++/clang</li><li>bash</li><li>ssh</li></ul></p>'
  });

  var Modal2 = $Modal({
      title: 'Программирование в задачах радиолокации',
      content: '<p><b>Навыки, которые вы получите:</b><ul><li>Применение стандартных алгоритмов и структур данных</li><li>Разработка под Unix-like системами</li><li>Оценка сложности алгоритмов</li></ul></p><p class="content-entity-tools"><b>Инструменты, которые вы научитесь использовать:</b><ul><li>Контроль версий (git)</li><li>Cреды и инструменты разработки</li><ul><li>Терминал, Vim</li><li>MSVS</li><li>CodeBlocks</li></ul></ul></p>'
  });

  var Modal3 = $Modal({
    title: 'Алгебра и геометрия',
    content: '<p>Дисциплина изучает основные инструменты современной алгебры: матрицы, группы, множества, кольца и поля,а также их использование для решения задач аналитической геометрии, векторной и линейной алгебры.</p>'
  });

  var Modal4 = $Modal({
    title: 'Дискретная математика',
    content: '<p>Дисциплина устанавливает множество взаимосвязей между математическими моделями и дискретными методами, которые используются при программировании вычислительных систем. Булева алгебра, комбинаторика, графы и многие другие инструменты позволяют создавать, оптимизировать и детально описывать алгоритмы, которые будут пригодны для реализации в компьютерных системах.</p>'
  });

  var Modal5 = $Modal({
    title: 'Математический анализ',
    content: '<p>Дисциплина формирует основы естественно-научного мировоззрения, дает инструменты для создания и изучения наиболее распространенных математических моделей. Включает дифференциальное, интегральное и тензорное исчисление для анализа различных функций, зависимостей и явлений. </p>'
  });

  var Modal6 = $Modal({
    title: 'Методы математического анализа',
    content: ''
  });

  var Modal7 = $Modal({
    title: 'История',
    content: '<p>Дисциплина даёт понятие о закономерностях и особенностях развития различных культур, позволяет адекватно воспринимать роль человека, цивилизации, культурного многообразия общества в социально-историческом, этическом и философском контексте.</p>'
  });

  var Modal8 = $Modal({
    title: 'Иностранный язык',
    content: '<p>Дисциплина позволяет получить навыки восприятия и корректного формулирования информации на иностранных языках (английский, немецкий или французский) в профессиональной или межличностной коммуникации, в устной или письменной форме. Курс состоит из практических занятий по грамматике иностранного языка в различных предметных областях: образование, культура, наука, техника, урбанистика, профессиональная лексика в различных направлениях информационных технологий. </p>'
  });

  var Modal9 = $Modal({
    title: 'Физическая культура и спорт',
    content: '<p>Физическая культура и спорт является обязательной дисциплиной, которая продолжается с 1-го по 3-й курс бакалавриата и включает общую физическую подготовку, а также отдельные виды спорта: атлетическая гимнастика, баскетбол, бокс, борьба, волейбол, рукопашный бой, футбол. </p>'
  });

  var Modal10 = $Modal({
    title: 'Методы и стандарты программирования',
    content: '<p>С++ является одним из наиболее распространённых языков программирования с очень широкой сферой применения – от офисных приложений до программного обеспечения радиолокационного оборудования. Несмотря на то, что язык С++ имеет долгую историю, на сегодняшний день он продолжает повсеместно использоваться и активно развиваться, а его новые стандарты очень востребованы и мгновенно внедряются в современную практику. Помимо очевидной практической ценности, изучение С++ также полезно для понимания основ computer science и освоения других языков программирования.</p><p><b>Навыки, которые вы получите:</b><ul><li>Знания новых стандартов C++ (11/14/17/20)</li><li>Разработка программных проектов</li><li>Работа с C++ шаблонами</li><li>Создание графических приложений с использованием Qt</li><li>Использование принципов объектно-ориентированной парадигмы</li><li>Применение Compile Time возможностей языка</li></ul></p><p class="content-entity-tools"><b>Инструменты, которые вы научитесь использовать:</b><ul><li>Qt</li><li>C++11/14/17/20</li><li>g++/clang</li><li>CMake</li><li>STL/STD</li></ul></p>'
  });

  var Modal11 = $Modal({
    title: 'Правоведение',
    content: 'Содержимое модального окна 2'
  });

  var Modal12 = $Modal({
    title: '',
    content: 'Содержимое модального окна 2'
  });

  var Modal13 = $Modal({
    title: '',
    content: 'Содержимое модального окна 2'
  });

  document.addEventListener('click', function (e) {

      switch(e.target.dataset.toggle){
        case 'Modal-1':
          Modal1.show();
        break;

        case 'Modal-2':
          Modal2.show();
        break;

        case 'Modal-3':
          Modal3.show();
        break;

        case 'Modal-4':
          Modal4.show();
        break;

        case 'Modal-5':
          Modal5.show();
        break;

        case 'Modal-6':
          Modal6.show();
        break;

        case 'Modal-7':
          Modal7.show();
        break;

        case 'Modal-8':
          Modal8.show();
        break;

        case 'Modal-9':
          Modal9.show();
        break;

        case 'Modal-10':
          Modal10.show();
        break;

        case 'Modal-11':
          Modal11.show();
        break;

        case 'Modal-12':
          Modal12.show();
        break;

        case 'Modal-13':
          Modal13.show();
        break;

        case 'Modal-14':
          Modal14.show();
        break;

        case 'Modal-15':
          Modal15.show();
        break;

        case 'Modal-16':
          Modal16.show();
        break;

        case 'Modal-17':
          Modal17.show();
        break;

        case 'Modal-18':
          Modal18.show();
        break;

      }

  });
  })();