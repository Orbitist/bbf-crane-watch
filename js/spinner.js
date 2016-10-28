function removeSpinner() {
  $(document).find(".spinner").delay(2000).fadeOut(500, function () {
    $(this).remove();
  });
};
