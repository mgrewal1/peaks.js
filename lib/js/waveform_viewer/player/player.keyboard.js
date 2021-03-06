define(["m/bootstrap"], function (bootstrap) {

  return {
    init: function () {
      var pubsub = bootstrap.pubsub;
      var that = this;

      var SPACE = 32,
          TAB = 9,
          LEFT_ARROW = 37,
          RIGHT_ARROW = 39;

      $(document).on("keydown keypress keyup", function (event) { // Arrow keys only triggered on keydown, not keypress
        var c = event.keyCode,
            t = event.type,
            $t = $(event.target);

        if (!$t.is('input') && !$t.is('object')) {

          if ([SPACE, TAB, LEFT_ARROW, RIGHT_ARROW].indexOf(c) > -1) {
            event.preventDefault();
          }

          if (t === "keydown" || t === "keypress") {

            switch (c) {
              case SPACE:
                pubsub.emit("kybrd_space");
              break;

              case TAB:
                pubsub.emit("kybrd_tab");
              break;
            }
          } else if (t === "keyup") {

            switch (c) {
              case LEFT_ARROW:
                if (event.shiftKey) pubsub.emit("kybrd_shift_left");
                else pubsub.emit("kybrd_left");
              break;

              case RIGHT_ARROW:
                if (event.shiftKey) pubsub.emit("kybrd_shift_right");
                else pubsub.emit("kybrd_right");
              break;
            }
          }
        }
      });
    }
  };
});
