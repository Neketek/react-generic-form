const string = {
  not:{
    empty:message=>(value="", props={})=>!value?message(props):null,
  },
  len:{
    min:message=>min=>(value="", props={})=>value.length<min?message(props):null,
    max:message=>max=>(value="", props={})=>value.length>max?message(props):null,
  }
}


export default {
  string,
}
