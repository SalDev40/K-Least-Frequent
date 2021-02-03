const fs = require("fs");

const { merge_sort } = require("./sort");
function search_list(list_to_search, list_index, k_frequent_words) {}

function main() {
  try {
    /* get input from cli */
    const cli_args_arr = process.argv[2].split("input=")[1].split(";");
    const output_file = cli_args_arr[2].split("=")[1];
    const k_frequent_words = cli_args_arr[1].split("=")[1];
    const test_case = cli_args_arr[0];

    /* parse file and store words in list */
    let parsed_list = parse_input_file(test_case);
    let parsed_list_3 = parse_input_file(test_case);

    /* recursively sort list */
    let sorted_merged_list = merge_sort(parsed_list_3);

    console.log("full list: ", parsed_list);
    console.log("full list length: ", parsed_list.length);

    console.log("Merge Sorted : ", sorted_merged_list);
    console.log("Merge Sorted Length : ", sorted_merged_list.length);

    /* Test with sorted array by JS */
    let sorted_js = parsed_list.sort();
    console.log("Sorted by JS: ", sorted_js);
    let check = sorted_js.filter((n) => !sorted_merged_list.includes(n));
    console.log("Difference ? : ", check, "\n");
    console.log("Same ? : ", check.length == 0, "\n");

    /* recursively search for k frequent most frequent words  */
    search_list(parsed_list, 0, k_frequent_words);
  } catch (err) {
    console.error(err);
  }
}

function parse_input_file(file_name) {
  try {
    /* read in file synchronously */
    const data = fs.readFileSync(file_name, "utf8");
    /* split file at all delimeters (.,!\n) and filter out spaces */
    let list_to_store_in = data
      .split(/[,.!?;\n ]/)
      .filter((word) => word != "");
    console.log("input length: ", list_to_store_in.length);
    return list_to_store_in;
  } catch (err) {
    return Error("failed to parse input file");
  }
}

main();
