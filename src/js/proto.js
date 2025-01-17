var $parent = $("#main"),
    $aside = $("#aside"),
    $asideTarget = $aside.find(".aside--details"),
    $asideClose = $aside.find(".close"),
    $tilesParent = $(".tiles-a"),
    $tiles = $tilesParent.find("a"),
    slideClass = "show-detail";

// Tile click
$tiles.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if ($("html").hasClass(slideClass)) {
        killAside();
        $(this).attr("aria-expanded", "false");
    } else {
        $tiles.removeClass("active");
        $(this).addClass("active").attr("aria-expanded", "true");
        loadTileData($(this));
    }
});

// Close button click
$asideClose.on("click", function (e) {
    e.preventDefault();
    killAside();
});

// Load data to aside
function loadTileData(target) {
    var $this = $(target),
        itemHtml = $this.find(".details").html();

    $asideTarget.html(itemHtml);
    showAside();
}

// Show/hide aside
function showAside() {
    if (!$("html").hasClass(slideClass)) {
        $("html").addClass(slideClass);
        $aside.attr("aria-hidden", "false");
        focusCloseButton();
    }
}

// Handle Esc key
window.addEventListener("keyup", function (e) {
    if (e.code === "Escape") {
        killAside();
    }
});

let lastScrollPosition = 0;

function killAside() {
    if ($("html").hasClass(slideClass)) {
        // Guardar la posición actual
        lastScrollPosition = window.scrollY;

        $("html").removeClass(slideClass);
        sendFocusBack();
        $aside.attr("aria-hidden", "true");
        $tiles.attr("aria-expanded", "false");

        // Restaurar la posición
        window.scrollTo(0, lastScrollPosition);
    }
}


// Focus management
function focusCloseButton() {
    $asideClose.focus();
}

function sendFocusBack() {
    var $active = $(".active");
    if ($active.length) {
        $active[0].focus({ preventScroll: true });
    }
}


// Handle body click to close off-canvas
$parent.on("click", function () {
    if ($("html").hasClass(slideClass)) {
        killAside();
    }
});
