exports.merge_reduced_list = (first_list, second_list) => {};

exports.start_reducing_list = (sorted_merged_list) => {
  /* break the sorted list into fourths and reduce  */
  let quarter_length = sorted_merged_list.length / 4;
  let first_quarter = sorted_merged_list.slice(0, quarter_length);
  let second_quarter = sorted_merged_list.slice(
    quarter_length,
    quarter_length * 2
  );

  /*  check if we can merge more into one list on boundaries */
  if (first_quarter[first_quarter.length - 1] == second_quarter[0]) {
    console.log("boundary violation first and second .. ");
    console.log("first quarter: ", first_quarter);
    console.log("second quarter: ", second_quarter);
    console.log("first last: ", first_quarter[first_quarter.length - 1]);
    console.log("second first: ", second_quarter[0]);
    /* @TODO: move all the boundary words onto first list */
    
  }

  let third_quarter = sorted_merged_list.slice(
    quarter_length * 2,
    quarter_length * 3
  );
  if (second_quarter[second_quarter.length - 1] == third_quarter[0]) {
    console.log("boundary violation second and third .. ");
    console.log("second quarter: ", second_quarter);
    console.log("third quarter: ", third_quarter);
    console.log("second last: ", second_quarter[second_quarter.length - 1]);
    console.log("third first: ", third_quarter[0]);
  }

  let fourth_quarter = sorted_merged_list.slice(
    quarter_length * 3,
    sorted_merged_list.length
  );

  if (third_quarter[third_quarter.length - 1] == fourth_quarter[0]) {
    console.log("boundary violation third and fourth .. ");
    console.log("third quarter: ", third_quarter);
    console.log("fourth quarter: ", fourth_quarter);
    console.log("third last: ", third_quarter[third_quarter.length - 1]);
    console.log("fourth first: ", fourth_quarter[0]);
  }

  /* reduce each list in pieces */
  let reduced_list_first = this.reduce_list(
    first_quarter,
    [],
    0,
    0,
    first_quarter.length
  );
  let reduced_list_second = this.reduce_list(
    second_quarter,
    [],
    0,
    0,
    second_quarter.length
  );
  let reduced_list_third = this.reduce_list(
    third_quarter,
    [],
    0,
    0,
    third_quarter.length
  );
  let reduced_list_fourth = this.reduce_list(
    fourth_quarter,
    [],
    0,
    0,
    fourth_quarter.length
  );

  /* 
    @TODO: before merging make sure to check if the
    same word is perhaps in both lists with different count
    */
  return reduced_list_first
    .concat(reduced_list_second)
    .concat(reduced_list_third)
    .concat(reduced_list_fourth);
};

exports.reduce_list = (
  sorted_list,
  reduced_list,
  counter,
  total_count_of_words,
  length_list
) => {
  let new_total = total_count_of_words + 1;
  let next_word = counter + 1;
  if (counter == length_list) {
    return reduced_list;
  } else {
    if (sorted_list[counter] != sorted_list[next_word]) {
      let new_reduced_list = [
        ...reduced_list,
        [new_total, sorted_list[counter]],
      ];
      return this.reduce_list(
        sorted_list,
        new_reduced_list,
        next_word,
        0,
        length_list
      );
    } else {
      return this.reduce_list(
        sorted_list,
        reduced_list,
        next_word,
        new_total,
        length_list
      );
    }
  }
};
