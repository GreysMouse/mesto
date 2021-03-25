# Проект №4: __"Место"__
_https://greysmouse.github.io/mesto/index.html_


### О проекте
------
Данный одностраничный сайт позволяет пользователю разместить информацию о себе и добавить карточки мест, в которых он побывал. Реализованы удобные способы изменения / добавления данной информации.

### Технологии, использованные при создании проекта
------
* Верстка сайта реализована с применением БЭМ-методологии.
* Использованы технологии Flexbox и Grid Layout для выравнивания элементов и построения сетки карточек.
* Реализована адаптивная верстка сайта под разрешения экранов от 320px до 1280px. 
* Поведение элементов сайта (кнопки и поля форм), а также динамическая валидация полей форм осуществляется при помощи скрипта на Javascript.
* Применены шаблоны верстки (template) для создания карточек с изображением.
* Реализовано плавное закрытие и открытие всплывающих окон за счёт использования css-свойства transition для скрытых из общего потока элементов (достигается за счёт visibility: hidden + display: fixed).
* Реализована валидация полей ввода форм на странице с использованием стандартного текста ошибок.

### Функционал сайта
------
* Пользователь имеет возможность редактировать имя, аватар и описание рода деятельнотсти в профиле.
* Пользователь может добавлять (для чего необходимо ввести название и ссылку на изображение в модальном окне) и удалять (при нажатии на соответствующую кнопку в виде корзины) любую карточку с изображением.
* Пользователь может ставить отметку "Мне нравится" (лайк) на любую выбранную им карточку с изображением (для этого необходимо нажать на кнопку в виде сердечка на соответсвующей карточке).
* Нажатие на изображение карточки позволяет увидеть полноразмерное изображение этой карточки (во всплывающем модальном окне).
* Огранизовано плавное открытие и закрытие модальных окон.
* Для закрытия модальных окон в дополнение к соответствующей кнопке "Закрыть" добавлена возможность закрытия кликом мыши на оверлей или нажатием клавиши "Esc".
* Добавлено всплывающее окно с подтверждением действия удаления карточки с изображением. Пользователь может удалить только собственные карточки.

### Дальнейшие улучшения
------
Добавить возможность регистрации/авторизации пользователя для входа на сайт.