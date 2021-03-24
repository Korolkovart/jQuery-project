import Cat from "../../img/cat.jpeg";

("use strict");

// перечисление табов
const tabs = {
    first: 0,
    second: 1,
    third: 2,
    fourth: 3,
};

// логика перемщения картики в №3 таб
$("#cat").attr("src", Cat);

$(function () {
    $(".img-wrap").draggable();
});

(function ($) {
    //

    /**
     * Табы
     */
    $.fn.tabs = function () {
        var $self = $(this);
        var $tabHeaders = $self
            .find(".js-tab-header")
            .filter(function (index, el) {
                return $(el).parentsUntil($self).length === 1;
            });

        var $tabContent = $self
            .find(".js-tab-content")
            .filter(function (index, el) {
                return $(el).parentsUntil($self).length === 1;
            });

        /**
         * Активация таба по его индексу
         * @param {Number} index - индекс таба, который нужно активировать
         */
        var selectTab = function (index) {
            $tabHeaders.removeClass("active").eq(index).addClass("active");
            $tabContent.removeClass("active").eq(index).addClass("active");
        };

        /**
         * Инициализаиця
         */

        var init = function () {
            selectTab(tabs.first);

            // Обработка событий
            $tabHeaders.on("click", function () {
                let zoomTab = false;

                if ($(this).index() === tabs.fourth) {
                    zoomTab = true;
                }

                // выделяем активный таб и работаем с ним
                selectTab($(this).index());
                $(".tabs-btn").each(function (i, elm) {
                    $(elm).text($(elm).next("ul").find("li.active").text());
                });

                // добавление логики увеличения изображения
                if (zoomTab) {
                    class Zoom {
                        constructor(imageZoom) {
                            this.urlImage = imageZoom;
                            this.img = undefined;
                            this.$img = undefined;

                            this.init = function () {
                                this.calcs();
                            };
                            this.calcs = function () {
                                let self = this;
                                this.img = new Image();
                                this.img.onload = function () {
                                    self.build();
                                };
                                this.img.src = this.urlImage;
                            };

                            this.build = function () {
                                let self = this;
                                this.$img = $(self.img);

                                $(".tab-content__zoom")
                                    .fadeIn(400)
                                    .append(this.$img);

                                let imgZoom = $(".tab-content__zoom").find(
                                    "img"
                                );
                                imgZoom.attr("id", "zoom-img");

                                this.$img.on("mousedown", function (e) {
                                    e.preventDefault();
                                });

                                // перемещение картинки
                                $(".tab-content__zoom").on(
                                    "mousemove",
                                    function (e) {
                                        e.preventDefault();

                                        let wx = $(
                                            ".tab-content__zoom"
                                        ).width();
                                        let wy = $(
                                            ".tab-content__zoom"
                                        ).height();
                                        let iy = self.$img.height();
                                        let ix = self.$img.width();

                                        // ведем расчет положение мышки от текущего окна
                                        let px = e.pageX - wx;
                                        let py = e.pageY - wy;

                                        // перемещение картинки
                                        let tx = -1 * (px / wx) * (ix - wx);
                                        let ty = -1 * (py / wy) * (iy - wy);

                                        self.$img.css({
                                            transform:
                                                "translate(" +
                                                tx +
                                                "px, " +
                                                ty +
                                                "px)",
                                        });
                                    }
                                );
                            };
                        }
                    }

                    const zoom = new Zoom(Cat);
                    zoom.init();
                } else {
                    $("#zoom-img").remove();
                    $(".tab-content__zoom").css("display", "none");
                }

                if (window.matchMedia("(max-width: 768px)").matches) {
                    $(".js-tabs-wrap").slideUp("fast");
                }
            });
        };

        init();

        this.selectTab = selectTab;

        return this;
    };

    // Инициализируем табы на всех блоках с классом 'js-tabs'
    $(".js-tabs").each(function () {
        $(this).data("tabs", $(this).tabs());
    });

    //Делаем выпадающий список из табов
    $(".tabs-btn").each(function (i, elm) {
        $(elm).text($(elm).next("ul").find("li.active").text());
    });
    $(".tabs-btn").on("click", function (e) {
        e.preventDefault();
        $(e.target).next("ul").slideToggle("fast");
    });
})(jQuery);
