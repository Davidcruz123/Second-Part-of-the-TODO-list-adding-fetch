import React from 'react'
let contador = 0
const Aplicacion = () => {
    const [datos, setdatos] = React.useState([])
    let [objeto, setobjsto] = React.useState([])


    React.useEffect(
        () => {

            obtenerdata()
        }, []

    )

    const obtenerdata = () => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/davidcruz')
            .then(Response => Response.json())
            .then((database) => {
                setobjsto(() => { return darformatorecibido(database) })
                console.log(database, "data del get")
            })
            .catch(err => console.log(err));
    }



    const darformato = (listadeobjetos) => {

        var nuevlista = listadeobjetos.map((objeto) => {
            delete objeto.id
            objeto.done = false

            return { label: objeto.mensaje, done: false }// objeto 
        })
        // console.log(nuevlista,"darformato")
        return nuevlista
    }

    const darformatorecibido = (listadeobjetos) => {

        var nuevlista = listadeobjetos.map((objeto, identificador) => {
            delete objeto.done
            objeto.done = false

            return { mensaje: objeto.label, id: identificador }// objeto 
        })
        // console.log(nuevlista, "darformato")
        return nuevlista
    }





    const enviardata = (informacion) => {


        fetch('https://assets.breatheco.de/apis/fake/todos/user/davidcruz', {
            method: "PUT",
            body: JSON.stringify(informacion
                //     [
                //     { label: "Make the bed", done: false },
                //     { label: "Make the bed", done: false },
                //     { label: "Make the bed", done: false },

                // ]
            ),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(Response => Response.json())
            .then(data => {
                console.log(data, "53")

                obtenerdata()
            }

            ) // Manipulate the data retrieved back, if we want to do something with it
            .catch(err => console.log(err), "error") // Do something with the error
    }

    const agregar = (event) => {

        if (event.keyCode === 13 && event.target.value !== "") {
            setobjsto([{ mensaje: event.target.value, id: contador }, ...objeto,])
            console.log("agregar evento", objeto)

            console.log([{ mensaje: event.target.value, id: contador }, ...objeto,], "agregar")
            enviardata(darformato([{ mensaje: event.target.value, id: contador }, ...objeto,]))

            event.target.value = ""
            contador++



        }
    }

    const removeitem = (id) => {
        let newobjet = objeto.filter((elemento) => elemento.id !== id);
        setobjsto(newobjet)
        console.log(newobjet, "nuevo objeto")
        enviardata(darformato(newobjet))
        contador--

    }
    const insertarlineafinal = () => {
        if (objeto.length !== 0) {
            return (<div className="tareas pendiente">
                {objeto.length} Item left
            </div>)
        }
    }
    return (
        <div>
            <h1>todos</h1>
            <div className="lista">
                <input className="form-control form-control-lg shadow-lg" type="text" placeholder={objeto[0] == undefined ? " No tasks, add a task" : "What needs to be done?"} onKeyUp={(event) => agregar(event)}></input>
                {
                    objeto.map((elementos) => {
                        return (
                            <div className="tareas " key={elementos.id}>
                                <div className="mensajediv">
                                    {elementos.mensaje}
                                </div>


                                <div className="equis">
                                    <p onClick={() => removeitem(elementos.id)}>x</p>
                                </div>

                            </div>)
                    })
                }

                {insertarlineafinal()}

            </div>
        </div>
    )
}

export default Aplicacion








 //  fetch('https://assets.breatheco.de/apis/fake/todos/user/davidcruz', {
    //      method: "POST",
    //      body: JSON.stringify([]),
    //      headers: {
    //          "Content-Type": "application/json"
    //      }
    //  })
    //      .then(resp => {
    //         //  console.log(resp.ok); // will be true if the response is successfull
    //         //  console.log(resp.status); // the status code = 200 or code = 400 etc.
    //         //  console.log(resp.text()); // will try return the exact result as string
    //          return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    //      })
    //      .then(data => {
    //          //here is were your code should start after the fetch finishes
    //          console.log(data); //this will print on the console the exact object received from the server
    //      })
    //      .catch(error => {
    //          //error handling
    //          console.log(error);
    //      });
    //}