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
  /* if we are done bubbling up this round, return partially sorted list
        and index it stopped checking at */
  if (index_to_compare_to == stop_index) {
    return {
      sorted_bubble_list: list_to_sort,
      next_index_to_stop_at: stop_index - 1,
    };
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

exports.start_bubble_sort = (
  list_to_sort,
  index_to_check,
  index_to_compare_to,
  stop_index
) => {
  /* start sorting list one round */
  let { sorted_bubble_list, next_index_to_stop_at } = this.bubble_sort(
    list_to_sort,
    index_to_check,
    index_to_compare_to,
    stop_index
  );
  console.log(
    "one round done checking, new stop index......... => ",
    next_index_to_stop_at
  );
  /* if sorted list round is the final round then we are done */
  if (next_index_to_stop_at == 0) {
    return sorted_bubble_list;
  } else {
    /* else start new round stopping one before last stoppped index */
    return this.start_bubble_sort(
      sorted_bubble_list,
      0,
      1,
      next_index_to_stop_at
    );
  }
};

exports.merge_sort = (list_to_sort) => {
  if (list_to_sort.length == 1) {
    return list_to_sort;
  } else {
    let middle = Math.floor(list_to_sort.length / 2);
    let left_list = list_to_sort.slice(0, middle);

    // console.log("\nleft list: ", left_list);
    let right_list = list_to_sort.slice(middle);

    // console.log("right list: ", right_list);
    let split_left_list = this.merge_sort(left_list);
    let split_right_list = this.merge_sort(right_list);

    // console.log("\nmerging ...", split_left_list, split_right_list);

    let partial_merged = this.merge([], split_left_list, split_right_list);
    // console.log("\npartial merge: ", partial_merged);
    return partial_merged;
  }
};

exports.merge = (merging_list, left_list, right_list) => {
  // console.log(
  //   "\nmerged: ",
  //   merging_list,
  //   "\nleft: ",
  //   left_list,
  //   "\nright: ",
  //   right_list,
  //   "\n"
  // );

  if (!left_list.length && !right_list.length) {
    return merging_list;
  } else if (!left_list.length && right_list.length) {
    return merging_list.concat(right_list);
  } else if (left_list.length && !right_list.length) {
    return merging_list.concat(left_list);
  } else if (left_list.length && right_list.length) {
    if (left_list[0] < right_list[0]) {
      let new_list = [].concat(merging_list).concat(left_list[0]);
      let new_left_list = left_list.slice(1, left_list.length);
      return this.merge(new_list, new_left_list, right_list);
    } else {
      let new_list = [].concat(merging_list).concat(right_list[0]);
      let new_right_list = right_list.slice(1, right_list.length);
      return this.merge(new_list, left_list, new_right_list);
    }
  } else {
  }
};
