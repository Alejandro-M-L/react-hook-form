import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch /*valida confirmar password */,
    setValue, /* para la foto */
    reset /* Limpia todo */
  } = useForm({
    defaultValues: {
      nombre: "Alejandro",
      correo: "example@gmail.com"
    }}
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert("Enviando datos...")
    reset()
    //hace algo parecido que el reset, pero en uno por uno, el reset limpia todo
    // setValue('correo', '')
    //ANTES DE ENVIAR 
    //fetch
  });
  return (
    <form onSubmit={onSubmit}>
      {/* nombre */}
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        {...register("nombre", {
          required: {
            value: true,
            message: "Nombre es requerido",
          },
          minLength: {
            value: 2,
            message: "El nombre debe tener al menos 2 caracteres",
          },
          maxLength: {
            value: 20,
            message: "El nombre debe tener máximos 20 caracteres",
          },
        })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}
      {/* {
        errors.nombre?.type === "required" && <span>Nombre es requerido</span>
      } */}
      {/* {
        errors.nombre?.type === "minLength" && <span>El nombre debe tener al menos 2 caracteres</span>
      } */}
      {/* email */}
      <label htmlFor="correo">Correo</label>
      <input
        type="email"
        {...register("correo", {
          required: {
            value: true,
            message: "Correo es requerido",
          },
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: "Correo no valido",
          },
        })}
      />
      {errors.correo && <span>{errors.correo.message}</span>}
      {/* password */}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Password es requerido",
          },
          minLength: {
            value: 6,
            message: "El password debe tener al menos 6 caracteres",
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      {/* confirmar password */}
      <label htmlFor="confirmarPassword">Confirmar password</label>
      <input
        type="password"
        {...register("confirmarPassword", {
          required: {
            value: true,
            message: "Confirmar password es requerido",
          },
          validate: (value) =>
            value === watch("password") || "Los password no coinciden",
        })}
      />
      {errors.confirmarPassword && (
        <span>{errors.confirmarPassword.message}</span>
      )}
      {/* fecha de Nacimiento */}
      <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
      <input
        type="date"
        {...register("fechaNacimiento", {
          required: {
            value: true,
            message: "Fecha de nacimiento es requeridad",
          },
          validate: (value) => {
            console.log(value);
            const fechaNacimiento = new Date(value);
            const fechaActual = new Date();
            const edad =
              fechaActual.getFullYear() - fechaNacimiento.getFullYear();
            console.log(edad);
            return edad >= 18 || "Debe ser mayor de edad";
            // if (edad >= 18) {
            //   return true;
            // } else {
            //   return "Debe ser mayor de edad";
            // }
          },
        })}
      />
      {errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>}
      {/* país */}
      <label htmlFor="pais">País</label>
      <select {...register("pais")}>
        <option value="mx">México</option>
        <option value="co">Colombia</option>
        <option value="ar">Argentina</option>
      </select>
      {watch("pais") == "ar" && (
        <>
          <input
            type="text"
            placeholder="Provincia"
            {...register("provincia", {
              required: {
                value: true,
                message: "Provincia requeridad",
              },
            })}
          />
          {errors.provincia && <span>{errors.provincia.message}</span>}
        </>
      )}
      {/* file */}
      <label htmlFor="foto">Foto de perfil</label>
      <input type="file" onChange={(e) => {
        console.log(e.target.files[0])
        setValue('fotoDelUsuario', e.target.files[0].name)
      }} />
      {/* <input type="file" {...register("foto")} /> */}

      {/* terminos */}
      <label htmlFor="terminos">Acepto términos y condiciones</label>
      <input
        type="checkbox"
        {...register("terminos", {
          required: {
            value: true,
            message: "Debe aceptar términos  y condiciones"
          },
        })}
      />
      {errors.terminos && <span>{errors.terminos.message}</span>}

      <button type="submit">Enviar</button>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
}

export default App;
//npm i react-hook-form
//https://react-hook-form.com/