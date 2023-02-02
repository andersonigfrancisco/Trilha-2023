//process.stdin
//  .pipe(process.stdout)

import {Readable,Writable,Transform} from 'node:stream'

class OneToHundredStream extends Readable {
  
  index = 1

  _read(){

    const i = this.index++

    setTimeout(()=>{
      if (i>100)
        this.push(null)
      else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    },1000)
  }
}

class InverserNumberStream extends Transform {

  _transform(chunk,encoding,callback){

    const tranformedNuber = Number(String(chunk)) * -1

    callback(null,Buffer.from(String(tranformedNuber)))
  }
}

class MultiplyByTenStream extends Writable {

  _write(chunk,encoding,callback){

    console.log(Number(String(chunk))*10)
    callback()
  }
}

new OneToHundredStream()
    .pipe(new InverserNumberStream())
    .pipe(new MultiplyByTenStream())