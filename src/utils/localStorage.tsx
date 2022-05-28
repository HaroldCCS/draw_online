

export const getName = (_setState: (_name: string) => void) => {
  let existsName = localStorage.getItem('name')
  
  if (!existsName) {
    let _name = prompt('Ingrsa tu apodo:');
    alert(_name);
    localStorage.setItem('name', _name as string)
    existsName = _name
  }

  _setState(existsName as string)
}

