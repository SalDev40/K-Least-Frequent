exports.merge_reduced_list = (first_list, second_list) => {};

exports.start_reducing_list = (sorted_merged_list) => {
  /* break the sorted list into fourths and reduce  */
  let quarter_length = Math.floor(sorted_merged_list.length / 4);

  console.log("\n****** splitting first, checking with second.. ");
  let [first_quarter_list, second_starting_index] = this.split_list(
    sorted_merged_list,
    0,
    quarter_length,
    quarter_length,
    quarter_length * 2
  );

  console.log("\n**** splitting second, checking with third.. ");
  let [second_quarter_list, third_starting_index] = this.split_list(
    sorted_merged_list,
    second_starting_index,
    quarter_length * 2,
    quarter_length * 2,
    quarter_length * 3
  );

  console.log("\n**** splitting third, checking with fourth.. ");
  let [third_quarter_list, fourth_starting_index] = this.split_list(
    sorted_merged_list,
    third_starting_index,
    quarter_length * 3,
    quarter_length * 3,
    sorted_merged_list.length
  );

  console.log("\n***** splitting fourth.. ");
  let fourth_quarter_list = this.split_list(
    sorted_merged_list,
    fourth_starting_index,
    sorted_merged_list.length,
    null,
    null
  );

  console.log("\n");
  /* reduce each list in pieces */
  let reduced_list_first = this.reduce_list(
    first_quarter_list,
    [],
    0,
    0,
    first_quarter_list.length
  );
  let reduced_list_second = this.reduce_list(
    second_quarter_list,
    [],
    0,
    0,
    second_quarter_list.length
  );
  let reduced_list_third = this.reduce_list(
    third_quarter_list,
    [],
    0,
    0,
    third_quarter_list.length
  );
  let reduced_list_fourth = this.reduce_list(
    fourth_quarter_list,
    [],
    0,
    0,
    fourth_quarter_list.length
  );
  return reduced_list_first
    .concat(reduced_list_second)
    .concat(reduced_list_third)
    .concat(reduced_list_fourth);
};

exports.reduce_list = (
  sorted_list,
  reduced_list,
  current_word,
  total_count_of_current_word,
  length_list
) => {
  let new_total_count_of_current_word = total_count_of_current_word + 1;
  let next_word = current_word + 1;
  /* if all words have been searched return reduced list */
  if (current_word == length_list) {
    return reduced_list;
  } else {
    /* if the current word does not equal next word */
    if (sorted_list[current_word] != sorted_list[next_word]) {
      /* create a new list with this word and its current count
         combined with previous reduced list
      */
      let new_reduced_list = [
        ...reduced_list,
        [new_total_count_of_current_word, sorted_list[current_word]],
      ];
      /* return this new created list, start searching from next
         different word in list and reset its total count to 0
      */
      return this.reduce_list(
        sorted_list,
        new_reduced_list,
        next_word,
        0,
        length_list
      );
    } else {
      /* if current word does equal next word then 
         leave reduced list as it is and send new total count
         of current word
        */
      return this.reduce_list(
        sorted_list,
        reduced_list,
        next_word,
        new_total_count_of_current_word,
        length_list
      );
    }
  }
};

exports.get_word_count = (
  sorted_list,
  current_word,
  total_count_of_current_word
) => {
  let new_total_count_of_current_word = total_count_of_current_word + 1;
  let next_word = current_word + 1;
  /* if the current word does not equal next word */
  if (sorted_list[current_word] != sorted_list[next_word]) {
    /* return the current  word count of first word */
    return new_total_count_of_current_word;
  } else {
    return this.get_word_count(
      sorted_list,
      next_word,
      new_total_count_of_current_word
    );
  }
};

exports.split_list = (
  sorted_merged_list,
  starting_length,
  end_length,
  next_starting_length,
  next_end_length
) => {
  let current_quarter = sorted_merged_list.slice(starting_length, end_length);
  console.log("current quarter: ", current_quarter);
  /* if this is the last fourth quadrant it has no next list to compare to  */
  if (next_starting_length == null && next_end_length == null) {
    return current_quarter;
  }

  /* get next list quarter */
  let next_quarter = sorted_merged_list.slice(
    next_starting_length,
    next_end_length
  );
  console.log("next quarter: ", next_quarter);

  /*  check if we can merge the current list with the next list
      beginning elements in case a border violiation
      EX: 
        - incorrect: current = ["app", "pop"], next = ["pop", "two"]
        - correct: current = ["app", "pop", "pop"], next = [two"]
  */
  if (current_quarter[current_quarter.length - 1] == next_quarter[0]) {
    console.log("=> boundary violation current and next .. ");

    let words_to_move = this.get_word_count(next_quarter, 0, 0);
    /* create new next list without boundary words in beginning  */
    let elements_to_merge = next_quarter.slice(0, words_to_move);
    let new_next_list = next_quarter.slice(words_to_move, next_quarter.length);
    let new_current_list = current_quarter.concat(elements_to_merge);
    let next_list_split_starting_position =
      next_starting_length + words_to_move;
    console.log(
      "\n => total words to move from next to current ",
      words_to_move
    );

    console.log("=> total elements to merge: ", elements_to_merge);
    console.log("=> current quarter: ", current_quarter);
    console.log("=> new current list: ", new_current_list);
    console.log("\n=> next list: ", next_quarter);
    console.log("=> new next list: ", new_next_list);
    console.log(
      "=> next list starting pos: ",
      next_list_split_starting_position
    );
    return [new_current_list.concat([]), next_list_split_starting_position];
  } else {
    return [current_quarter.concat([]), next_starting_length];
  }
};
