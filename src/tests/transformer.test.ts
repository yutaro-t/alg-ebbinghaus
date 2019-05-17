import { transformer, SerializableClass } from '../utils/transformer';

class Test1 implements InstanceType<SerializableClass>{
  constructor(public field1: string, public field2: string) {}
  serialize(): string {
    return this.field1 + ' ' + this.field2;
  }
  static deserialize(val: string): Test1 {
    let [field1, field2] = val.split(' ');
    return new Test1(field1, field2);
  } 

  isEqual(t: Test1):boolean {
    return this.field1 === t.field1 && this.field2 === t.field2;
  }
}

class Test2 implements InstanceType<SerializableClass>{
  constructor(public field1: string, public field2: string) {}
  serialize(): string {
    return JSON.stringify([this.field1, this.field2])
  }
  static deserialize(val: string): Test2 {
    let [field1, field2] = JSON.parse(val);
    return new Test2(field1, field2);
  } 

  isEqual(t: Test2): boolean {
    return this.field1 === t.field1 && this.field2 === t.field2;
  }
  sampleFunc() {
    console.log(this.field1 + ' ' + this.field2);
  }
}

describe('Transformer', () => {
  it('should work', () => {
    const state = {
      foo: 'foo',
      biz: null,
      test1: new Test1('Test1Field1-1', 'Test1Field2-1'),
      obj: {
        bar: 3,
        test1: new Test1('Test1Field1-2', 'Test1Field2-2'),
        test2: new Test2('Test2Field1-1', 'Test2Field2-1'),
        obj: {
          baz: true,
          test2: new Test2('Test2Field1-2', 'Test2Field2-2'),
          list: [new Test1('Test1Field1-3', 'Test1Field2-3'), new Test1('Test1Field1-4', 'Test1Field2-4')]
        }
      }
    };

    const transform = transformer([Test1, Test2]);
    const before = transform.in(state, '');
    expect(before).toStrictEqual({
      foo: 'foo',
      biz: null,
      test1: {
        __serializedType__: 'Test1', 
        data: 'Test1Field1-1 Test1Field2-1'
      },
      obj: {
        bar: 3,
        test1: {
          __serializedType__: 'Test1', 
          data: 'Test1Field1-2 Test1Field2-2'
        },
        test2: {
          __serializedType__: 'Test2', 
          data: '["Test2Field1-1","Test2Field2-1"]'
        },
        obj: {
          baz: true,
          test2: {
            __serializedType__: 'Test2', 
            data: '["Test2Field1-2","Test2Field2-2"]'
          },
          list: [
            {
              __serializedType__: 'Test1', 
              data: 'Test1Field1-3 Test1Field2-3'
            },{
              __serializedType__: 'Test1', 
              data: 'Test1Field1-4 Test1Field2-4'
            },
          ]
        }
      }
    });
    const after = transform.out(before, '');
    expect(after).toStrictEqual(state);
  })
})