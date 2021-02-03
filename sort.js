/* 
  ** maximum stack size is reached for approx. 4000+ words
  ** algorithm NOT used for submission
  ** time = O(n2)

  - BUBBLESORT:
    - checks the whole array round by round until sorted
    - each next check it stops index one before previous
      - EX: 
          round 1 = [0..20]
          round 2 = [0..19]
          round 3 = [0..18]

    - checks one round at a time until it reaches stop index,
      if possible to swap then it does
      - EX: 
          [0,1,2,3,...20]

    - Full example:
       - Round 1:
          - check whole array from [0..20] -> return
       - Round 2:
          - check whole array from [0..19] -> return
*/

exports.start_row_bubble_sort = (
  list_to_sort,
  index_to_check,
  index_to_compare_to,
  stop_index
) => {
  /* start sorting list one round at a time
     each next round stops one before previous
  */
  let { sorted_bubble_list, next_index_to_stop_at } = this.row_bubble_sort(
    list_to_sort,
    index_to_check,
    index_to_compare_to,
    stop_index
  );
  /* if sorted list round is the final round then we are done */
  if (next_index_to_stop_at == 0) {
    return sorted_bubble_list.concat([]);
  } else {
    /* else start new round stopping one before last stoppped index */
    return this.start_row_bubble_sort(
      sorted_bubble_list,
      0,
      1,
      next_index_to_stop_at
    );
  }
};

exports.row_bubble_sort = (
  list_to_sort,
  index_to_check,
  index_to_compare_to,
  stop_index
) => {
  /*  if we are done bubbling up this round, return partially sorted list
      and index it stopped checking at */
  if (index_to_compare_to == stop_index) {
    return {
      sorted_bubble_list: list_to_sort.concat([]),
      next_index_to_stop_at: stop_index - 1,
    };
  } else {
    /* get index of next two elements to check */
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
      return this.row_bubble_sort(
        new_list_one_swap,
        next_index_to_check,
        next_index_to_compare_to,
        stop_index
      );
    } else {
      /* no swapping was done check next two elements  */
      return this.row_bubble_sort(
        list_to_sort,
        next_index_to_check,
        next_index_to_compare_to,
        stop_index
      );
    }
  }
};

/* 
  ** maximum stack size is reached for approx. 4000+ words
  ** algorithm NOT used for submission
  ** time = O(n2)
  
  - BUBBLESORT:
    - this algorithm checks each pair instead of adding to call stack
    - checks the whole array round by round until biggest element is in the end
    - each next check it stops index one before previous
      - EX: 
          round 1 = [0..20] 
          round 2 = [0..19] 
          round 3 = [0..18]

    - checks one pair at a time in each round until it reaches stop index,
      if possible to swap then it does
      - EX: 
          [0,1] 
          [1,2]
          [2,3]
          [3,4]

    - Full example:
       - Round 1:
            - check whole array from [0..20]
            - first pair [0,1] -> return
            - second pair [1,2] -> return
            - third pair [2,3] -> return
            - nth pair [19,20] -> return
            - stop -> return
       - Round 2:
          - check whole array from [0..19]
            - first pair [0,1] -> return
            - second pair [1,2] -> return
            - third pair [2,3] -> return
            - nth pair [18,19] -> return
            - stop -> return
*/

exports.start_pair_bubble_sort = (
  list_to_sort,
  index_to_check,
  index_to_compare_to,
  stop_index
) => {
  /* start sorting list one pair at a time
     each next pair starts at the end of last
     pair check
  */
  let {
    sorted_bubble_list,
    next_index_to_compare_to,
    next_index_to_check,
    index_to_fully_stop_at,
  } = this.non_mututate_swap(
    list_to_sort,
    index_to_check,
    index_to_compare_to,
    stop_index
  );

  /* if sorted list round is the final round then we are done */
  if (next_index_to_compare_to == 0) {
    return sorted_bubble_list.concat([]);
  } else {
    /*
      if all pairs have beenn checked till the end
      start new round stopping one before last stoppped index
     */
    if (next_index_to_compare_to == index_to_fully_stop_at) {
      return this.start_pair_bubble_sort(
        sorted_bubble_list,
        0,
        1,
        index_to_fully_stop_at - 1
      );
    } else {
      /* continue this round with next two elements */
      return this.start_pair_bubble_sort(
        sorted_bubble_list,
        next_index_to_check,
        next_index_to_compare_to,
        index_to_fully_stop_at
      );
    }
  }
};

exports.non_mututate_swap = (
  list_to_sort,
  index_to_check,
  index_to_compare_to,
  stop_index
) => {
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

    return {
      sorted_bubble_list: new_list_one_swap,
      next_index_to_check: index_to_compare_to,
      next_index_to_compare_to: index_to_compare_to + 1,
      index_to_fully_stop_at: stop_index,
    };
  } else {
    return {
      sorted_bubble_list: list_to_sort,
      next_index_to_check: index_to_compare_to,
      next_index_to_compare_to: index_to_compare_to + 1,
      index_to_fully_stop_at: stop_index,
    };
  }
};

/* 
  ** time = O(nlogn)
  ** algorithm used for submission

  - MERGE SORT:
    - breaks down each new list until its down to one size
    - returns new lists by merging lists from bottom up 
    - Full example:
        - [0,3,2,1]
        
        - [0,3] , [2,1]
        - [0],[3]
        - [0,3] -> sorted
        
        - [0,3] , [2,1]
        
        - [2,1]
        - [2],[1]
        - [1,2]  -> sorted
        
        - [0,3], [1,2]  
        - [0,1,2,3] -> final sorted
*/

exports.merge_sort = (list_to_sort) => {
  /* if broke down to one element return */
  if (list_to_sort.length == 1) {
    return list_to_sort.concat([]);
  } else {
    /* split list in middle */
    let middle = Math.floor(list_to_sort.length / 2);
    let left_list = list_to_sort.slice(0, middle);
    let right_list = list_to_sort.slice(middle);

    /* recursively break down left and right list to one element */
    let split_left_list = this.merge_sort(left_list);
    let split_right_list = this.merge_sort(right_list);
    // console.log(split_left_list);
    // console.log(split_right_list);
    /* merge left and right lists */
    let partial_merged = this.merge([], split_left_list, split_right_list);
    // console.log(partial_merged);

    return partial_merged;
  }
};

exports.merge = (merging_list, left_list, right_list) => {
  /* if both lists empty then return fully merged list */
  if (!left_list.length && !right_list.length) {
    return [].concat(merging_list);
  } else if (!left_list.length && right_list.length) {
    /* if left list is empty but right isnt, add right list onto merged list  */
    return merging_list.concat(right_list);
  } else if (left_list.length && !right_list.length) {
    /* if right list is empty but left isnt, add left list onto merged list */
    return merging_list.concat(left_list);
  } else if (left_list.length && right_list.length) {
    /*  if first element in left list is smaller than 
        first element in right list
    */
    if (left_list[0] < right_list[0]) {
      /*  create a new list with the previous merged list and 
          first element of left list
      */
      let new_list = [].concat(merging_list).concat(left_list[0]);
      /* create new left list without the first element since its just been checked */
      let new_left_list = left_list.slice(1, left_list.length);
      /* pass in new merged list and new left list to next recursion call */
      return this.merge(new_list, new_left_list, right_list);
    } else {
      /*  create a new list with the previous merged list and 
          first element of right list
      */
      let new_list = [].concat(merging_list).concat(right_list[0]);
      /* create new right list without the first element since its just been checked */
      let new_right_list = right_list.slice(1, right_list.length);
      /* pass in new merged list and new right list to next recursion call */
      return this.merge(new_list, left_list, new_right_list);
    }
  }
};
