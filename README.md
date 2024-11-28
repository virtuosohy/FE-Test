# FE-Test
# 单元测试

单元测试存在于敏捷开发，敏捷开发是迭代式的软件开发流程



单元测试和自动化的关系



# Jest框架

## 简单测试

math.js

```javascript
const sum = (a ,b) => a + b;
module.exports = { sum };
```



math.test.js

```javascript
const { sum } = require('./math.js')

describe('Math module', () => {

  test('should return sum result when two number plus', () =>{

    //given
    const num1 = 2
    const num2 = 3

    //when
    const result = sum(num1, num2)

    //then
    expect(result).toEqual(5)

  })
})
```



## GWT套路

| GWT   | 3A      | 说明                               |
| ----- | ------- | ---------------------------------- |
| Given | Arrange | 准备测试数据，beforeEach，mock模块 |
| When  | Act     | 行动                               |
| Then  | Assert  | 断言 借助Matchers来拓展            |

断言语句Matcher

.toBe (value)

.toEqual(value)  来判断值是否符合预期



.toBeFalsy() 判断布尔值

.toHaveLength(number) 判断数组长度



## 模块间依赖 Fake/Stub/Mock/Spy

常见的依赖：数据库，网络请求，存取文件，外部系统



Mock替代整个模块

Stub模拟特定行为

Spy监听模块行为



### 测试详例

searchNames.js

```javascript
import * as services from './services';
const searchNames = (term) => {
   const matches = services.getName().filter((name) =>{
    return name.includes(term)
   })
//只想要三分之一的搜索结果
 return matches.length > 3 ? matches.slice(0,3) : matches;
}

const functionNotTested = (term) =>{
  return ` Hello ${term}`
}

export default searchNames;
```



searchNames.test.js

```javascript
import searchNames from "./searchNames";
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
```



services.js

```javascript
export function getName() {
  return []
}

```



此时会报错 Cannot use import statement outside a module

安装依赖

```bash
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

并在项目根目录添加babel.config.js

```javascript
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```



可以查看多少代码被测试了

```bash
yarn test --coverage  
```

| File              | % Stmts   | % Branch   | % Funcs   | % Lines   | Uncovered Line #s   |
| ----------------- | --------- | ---------- | --------- | --------- | ------------------- |
| All files         | 88.88     | 100        | 75        | 87.5      |                     |
| math              | 100       | 100        | 100       | 100       |                     |
| math.js           | 100       | 100        | 100       | 100       |                     |
| search            | 83.33     | 100        | 66.66     | 83.33     |                     |
| searchNames.js    | 83.33     | 100        | 66.66     | 83.33     | 11                  |
| ----------------- | --------- | ---------- | --------- | --------- | ------------------- |

根目录下会有一个coverage文件夹里面的html是报告

searchName.js

```javascript
test('should say hi when search ' ,() => {
//given
const result = functionNotTested('Jimmy')
    //then
  expect(result).toEqual('Hello Jimmy');
  expect(result).toMatchInlineSnapshot(`"Hello Jimmyll"`);
});
```

本toMatchInlineSnapshot(`"Hello Jimmyll"`);代码有出入，在命令行输入

```bash
npm test -- -u
```

会修改错误代码
