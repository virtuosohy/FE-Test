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