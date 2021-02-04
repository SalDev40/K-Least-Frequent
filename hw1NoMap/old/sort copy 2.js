exports.bubble_sort = (
  list_to_sort,
  index_to_check,
  index_to_compare_to,
  stop_index,
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

  /* searched all elements */
  if (stop_index == 0) {
    return list_to_sort;
  } else if (index_to_compare_to == stop_index) {
    /* we are done "bubbling up this element" */
    let next_index_to_check = 0;
    let next_index_to_start_comparing_to = 1;
    /* stop at 1 less then previous last index checked */
    let index_to_stop_checking = stop_index - 1;

    console.log(
      "\n => => checking next in list .....",
      "\n => => next index to check: ",
      next_index_to_check,
      " \n  =>  next word to check: ",
      list_to_sort[next_index_to_check],
      " \n  => next stop index: ",
      stop_index,
      "\n"
    );

    return this.bubble_sort(
      list_to_sort,
      next_index_to_check,
      next_index_to_start_comparing_to,
      index_to_stop_checking
    );
  } else {
    let next_index_to_check = index_to_check + 1;
    let next_index_to_compare_to = index_to_compare_to + 1;
    if (list_to_sort[index_to_check] > list_to_sort[index_to_compare_to]) {
      console.log(
        "   \n => => swapping forward :",
        index_to_check,
        "   \n => word to check: ",
        list_to_sort[index_to_check],
        "   \n => with compare backward: ",
        index_to_compare_to,
        "   \n => word to compare to : ",
        list_to_sort[index_to_compare_to],
        " \n  ",
        " *** Current list: ",
        list_to_sort,
        "\n"
      );

      let word_to_swap_forward = list_to_sort[index_to_check];
      let word_to_swap_backward = list_to_sort[index_to_compare_to];

      /* create a list containing all words up to word to swap forward */
      console.log(
        "word to swap forward: ",
        word_to_swap_forward,
        " at index: ",
        index_to_check
      );
      let list_before_index_to_swap_forward = list_to_sort.slice(
        0,
        index_to_check
      );

      console.log(
        "before swap index list: ",
        list_before_index_to_swap_forward
      );

      /* create a list containing all words after word swap backward */
      console.log(
        "word to swap backward: ",
        word_to_swap_backward,
        " at index: ",
        index_to_compare_to
      );

      let list_after_index_to_swap_backward = list_to_sort.slice(
        index_to_compare_to + 1,
        list_to_sort.length
      );
      console.log(
        "after swap index list : ",
        list_after_index_to_swap_backward
      );

      /* concat all arrays and words to create new intiial swapped list */
      let new_list_one_swap = list_before_index_to_swap_forward
        .concat(word_to_swap_backward)
        .concat(word_to_swap_forward)
        .concat(list_after_index_to_swap_backward);

      console.log("Functional: ", new_list_one_swap);

    //   /* REMOVE => just check to see it works same as procedural */
    //   let temp = list_to_sort[index_to_compare_to];
    //   list_to_sort[index_to_compare_to] = list_to_sort[index_to_check];
    //   list_to_sort[index_to_check] = temp;

    //   console.log("Procedural: ", list_to_sort);
    //   console.log(
    //     "Same ? : ",
    //     list_to_sort.filter((n) => !new_list_one_swap.includes(n)),
    //     "\n"
    //   );

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

exports.merge_sort = (list_to_sort) => {
  if (list_to_sort.length == 1) {
    return list_to_sort;
  } else {
    let middle = Math.floor(list_to_sort.length / 2);
    let left_list = list_to_sort.slice(0, middle);
    let right_list = list_to_sort.slice(middle);
    let merged_left_list = this.merge_sort(left_list);
    let merged_right_list = this.merge_sort(right_list);
    // console.log("left: ", left_list);
    // console.log("right: ", right_list);
    let merged_list = this.merge(merged_left_list, merged_right_list);
    // console.log("merged: ", merged_list);
    return merged_list;
  }
};

exports.merge = (left_list, right_list) => {
  const results = [];

  while (left_list.length && right_list.length) {
    if (left_list[0] < right_list[0]) {
      results.push(left_list.shift());
    } else {
      results.push(right_list.shift());
    }
  }

  return [...results, ...left_list, ...right_list];
};
