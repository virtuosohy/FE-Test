import  searchNames from "./searchNames";
import functionNotTested from"./hello.js";
import { getName } from "./services";

jest.mock("./services", () => ({
  getName:jest.fn()
}));

test('should return empty result when not search' ,() => {
//given
    const keyword = 'Jone ';
    getName.mockImplementation(() => []);
//when
    const result = searchNames(keyword);
    //then
    expect(result).toEqual([]);
});

test('should return target result when found search' ,() => {
//given
    const keyword = 'Jone';
    getName.mockImplementation(() => ["Jone","Jill","Ringo","John"]);
//when
    const result = searchNames(keyword);
    //then

    expect(result).toEqual(['Jone']);

});

test('should not return more than 3 matches' ,() => {
    //given
    const keyword = 'John';
    getName.mockImplementation(() => [
      "Jone",
      "Jill",
      "Ringo",
      "John wick 1",
      "John wick 2",
      "John wick 3",
      "John wick 4",
      "John wick 5"
    ]);
   //when
    const result = searchNames(keyword);
    //then
    expect(result).toHaveLength(3);
});


test('should handle null or undefined as input' ,() => {
//given
    getName.mockImplementation(() => []);
    //then
    expect(searchNames(undefined)).toEqual([]);
    expect(searchNames(null)).toEqual([]);
});

test('should return search result is  case sensitive' ,() => {
//given
getName.mockImplementation(() => ["Jone","Jill","Ringo","John"]);
    //then
  expect(searchNames('john')).toEqual([]);
});


test('should say hi when search ' ,() => {
//given
const result = functionNotTested('Jimmy')
    //then
  expect(result).toEqual('Hello Jimmy');
  expect(result).toMatchInlineSnapshot(`"Hello Jimmy"`);
});