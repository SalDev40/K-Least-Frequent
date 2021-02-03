exports.bubble_sort = (
  list_to_sort,
  index_to_check,
  index_to_compare_to,
  stop_index
) => {
  console.log(
    "index to check:",
    index_to_check,
    " => word to check: ",
    list_to_sort[index_to_check],
    " => compare: ",
    index_to_compare_to,
    " => word to compare to : ",
    list_to_sort[index_to_compare_to],
    " => stop index: ",
    stop_index
  );

  /* return sorted list if we searched all elements */
  if (stop_index == 0) {
    return { list_to_sort: list_to_sort, stop_index: stop_index };
  } else if (index_to_compare_to == stop_index) {
    /* we are done "bubbling up" for this round */

    /* start at beginning of list again */
    let next_index_to_check = 0;
    let next_index_to_start_comparing_to = 1;

    /* stop at 1 less then previous last index stopped at */
    let index_to_stop_checking = stop_index - 1;
    return { sorted_bubble_list: list_to_sort, index_stopped_at: stop_index - 1 };


    return this.bubble_sort(
      list_to_sort,
      next_index_to_check,
      next_index_to_start_comparing_to,
      index_to_stop_checking
    );
  } else {
    let next_index_to_check = index_to_check + 1;
    let next_index_to_compare_to = index_to_compare_to + 1;

    /* perform swap if current value is greater the next value */
    if (list_to_sort[index_to_check] > list_to_sort[index_to_compare_to]) {
      let word_to_swap_forward = list_to_sort[index_to_check];
      let word_to_swap_backward = list_to_sort[index_to_compare_to];

      /* create a list containing all words up to word to swap forward */
      let list_before_index_to_swap_forward = list_to_sort.slice(
        0,
        index_to_check
      );

      /* create a list containing all words after word swap backward */
      let list_after_index_to_swap_backward = list_to_sort.slice(
        index_to_compare_to + 1,
        list_to_sort.length
      );

      /* concat all arrays and "swapped" words to create new intitial swapped list */
      let new_list_one_swap = list_before_index_to_swap_forward
        .concat(word_to_swap_backward)
        .concat(word_to_swap_forward)
        .concat(list_after_index_to_swap_backward);

      /* use new "swapped" list and check next two elements */
      return this.bubble_sort(
        new_list_one_swap,
        next_index_to_check,
        next_index_to_compare_to,
        stop_index
      );
    } else {
      /* no swapping was done check next two elements  */
      return this.bubble_sort(
        list_to_sort,
        next_index_to_check,
        next_index_to_compare_to,
        stop_index
      );
    }
  }
};
