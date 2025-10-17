export default function VariableTypes() {
  // let numberVariable = 123;
  // let floatingPointNumber = 234.345;
  // let stringVariable = 'Hello World!';
  // let booleanVariable = true;
  // let isNumber = typeof numberVariable;
  // let isString = typeof stringVariable;
  // let isBoolean = typeof booleanVariable;
  const numberVariable: number = 123;
  const floatingPointNumber: number = 234.345;
  const stringVariable: string = 'Hello World!';
  const booleanVariable: boolean = true;
  const isNumber: string = typeof numberVariable;
  const isString: string = typeof stringVariable;
  const isBoolean: string = typeof booleanVariable;
  return(
    <div id="wd-variable-types">
      <h4>Variables Types</h4>
      numberVariable = { numberVariable }<br/>
      floatingPointNumber = { floatingPointNumber }<br/>
      stringVariable = { stringVariable }<br/>
      booleanVariable = { booleanVariable + "" }<br/>
      isNumber = { isNumber }<br/>
      isString = { isString }<br/>
      isBoolean = { isBoolean }<hr/>
    </div>
);}