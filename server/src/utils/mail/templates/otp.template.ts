export default function OtpMailTemplate(name: string, code: string) {
  const date = new Date();
  return `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #b8182f;
        background-repeat: no-repeat;
        background-size: 800px 452px;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <table style="width: 100%">
          <tbody>
            <tr style="height: 0">
              <td></td>
              <td style="text-align: right">
                <span style="font-size: 16px; line-height: 30px; color: #ffffff"
                  >
                  ${date.getDate()}/${date.getMonth()}
                    </span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </header>
      <main>
        <div
          style="
            margin: 0;
            margin-top: 70px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto">
            <img
              src=" https://res.cloudinary.com/djiafuqdd/image/upload/v1743435953/logo_gcpg24.png"
              alt=""
              width="200"
              height="150"
            />

            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Hola ${name},
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              ¡Es un placer tenerte de vuelta! Para continuar con tu inicio de
              sesión, utiliza el siguiente código:
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
                font-size: 40px;
                font-weight: 600;
                letter-spacing: 25px;
                color: #b8182f;
              "
            >
              ${code}
            </p>
            <p>
              ⚠️ Este código expira en 5 minutos. Por tu seguridad, no compartas
              este código con nadie. Ingenio Dental Laboratorio nunca te
              solicitará este tipo de información fuera de nuestra aplicación o
              página web. Si no solicitaste este código, por favor, ignora este
              mensaje. Gracias por confiar en nosotros. <br> <br> Atentamente, <br> <br> El equipo
              de Ingenio Dental Laboratorio
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #c9c9c9;
          "
        >
          ¿Necesitas ayuda? Pregunta en
          <a
            href="mailto:contacto@ingeniodentalab.com"
            style="color: #fff; text-decoration: none"
            >contacto@ingeniodentalab.com</a
          >
        </p>
      </main>
    </div>
  </body>
</html>

        `;
}
