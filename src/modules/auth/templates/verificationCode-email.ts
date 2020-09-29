export function generateVerificationCodeTemplate(name, code) {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
      <!--<![endif]-->
      <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if (gte mso 9)|(IE)]>
  <style type="text/css">
    body {width: 600px;margin: 0 auto;}
    table {border-collapse: collapse;}
    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
    img {-ms-interpolation-mode: bicubic;}
  </style>
<![endif]-->
      <style type="text/css">
    body, p, div {
      font-family: arial,helvetica,sans-serif;
      font-size: 14px;
    }
    body {
      color: #000000;
    }
    body a {
      color: #1188E6;
      text-decoration: none;
    }
    p { margin: 0; padding: 0; }
    table.wrapper {
      width:100% !important;
      table-layout: fixed;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    img.max-width {
      max-width: 100% !important;
    }
    .column.of-2 {
      width: 50%;
    }
    .column.of-3 {
      width: 33.333%;
    }
    .column.of-4 {
      width: 25%;
    }
    @media screen and (max-width:480px) {
      .preheader .rightColumnContent,
      .footer .rightColumnContent {
        text-align: left !important;
      }
      .preheader .rightColumnContent div,
      .preheader .rightColumnContent span,
      .footer .rightColumnContent div,
      .footer .rightColumnContent span {
        text-align: left !important;
      }
      .preheader .rightColumnContent,
      .preheader .leftColumnContent {
        font-size: 80% !important;
        padding: 5px 0;
      }
      table.wrapper-mobile {
        width: 100% !important;
        table-layout: fixed;
      }
      img.max-width {
        height: auto !important;
        max-width: 100% !important;
      }
      a.bulletproof-button {
        display: block !important;
        width: auto !important;
        font-size: 80%;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .columns {
        width: 100% !important;
      }
      .column {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .social-icon-column {
        display: inline-block !important;
      }
    }
  </style>
      <!--user entered Head Start--><!--End Head user entered-->
    </head>
    <body>
      <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#ffffff;">
        <div class="webkit">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
            <tr>
              <td valign="top" bgcolor="#ffffff" width="100%">
                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="100%">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                      <tr>
                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#eaeaea" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    <tr>
      <td role="module-content">
        <p>Necesitamos verificar que eres real, ¿nos ayudas?</p>
      </td>
    </tr>
  </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7e701613-0acf-468b-9331-c3eb7bc5ffe2">
    <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src="data:image/png;base64,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tCmB470++c9Xa8Xhh+iMk45WkqZycjr79BP01tPWqVypqlCIFDknM6lcrTYe048fysu5SJdc9u9a1rNIrz3xaDkzvfr4o3TZJR/Qhz75FTnH77JAs+FfPYAGpnzUJa1mi93HR4bM5Mv9UjKmbIsom/qsScfxPhu1+ub3b9Jl3/yhBodGs93TvVehEMlZtuapUq3q5xsf1nkXfUEDI6MNU33ee7W0tujG2zZpaGQsn9rLXnLjQ09KkdNeF7dbdt71C/K9pMGRUZ17wef0r9/7qXb27ck3GPXZtl9xQc5MXl5j5Yoq1WSaY9Yf0ms4qepDn/yKevsG5H12zueccaJOzffcYhQLaC4267hz+FcPHMSSZPrfo3yayDqWyApt+S1Ofqw3uw5hvthckswVZbMO1/g+Cb48KD/6/KQF7j7qkLX3yPI9sry8NLJFvjrxbUAvae1Llum1J63VUUcu1fw5szQ8WtKTzzyvn9/9kG65+yFVq9VswGnKVN94cLUWCzrndSepvS0brUqTVD+8+W5t3zXQsN6pUq7ojPVrtWpZj0xS/55h/Wc+jVd7b/lrHdE9X6/74+N07MtWavGCuTJJz+/s12NPb9Edmx7TPQ89qXI1URw5veX0derqnCVn0lNbtuvGDfdlx8pj8azXHK/uhV3jJ64nn9mmGzbcq2IcT/v3EEV72XUewIsagQUc5KYLrNpois9HbWpcbVimPrLk60ZwzNQ4+O1r1yeceNzkUaXx8a3KWKlhgbwrxioUohkXqdd/69BP3Ki4WKwbYJu85qlaTZQmae0EisW44XHZbu1SebQkpVNG4EwqtBSzby9Off18nVocT15pUa1Ua4vn5U1mUjzldesRWMDBiTVYQBMajydzU78hqIbIyQKkMONjvJfMNX6c1D9u/OdiW+u057SvbwCOn3Oxpbhf5+y9z+InnvlxkuRTr2LrXtZw7eP1p77H8Zg6kPcG4ODDGiygSe3tf/jTBci+nvv7HGt/7z+Q8zmQ2/b3tffnmL/v8QEcPAgsAACAwJgiBA5yrPEBgP97jGABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAERmABAAAE9r8Z4wML5CsiRAAAA7tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMC44MCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDIwLTA5LTI3PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjU0ZGVmMGY0LTIzNDMtNDI4Ni05NzhmLTQ0NDk2MmJjZjA4YTwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6cGRmPSdodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvJz4KICA8cGRmOkF1dGhvcj5BeGVsRGF2aWQ0NTwvcGRmOkF1dGhvcj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOkNyZWF0b3JUb29sPkNhbnZhPC94bXA6Q3JlYXRvclRvb2w+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0ncic/PpfyzPoAAAAASUVORK5CYII=">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="675800a1-647f-4337-aec3-4eb1cabf5f12" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 33px 18px 33px; line-height:40px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><h1 style="text-align: inherit"><strong>Bienvenido a Muvick ${name} 🎉</strong></h1>
<div style="font-family: inherit; text-align: justify">Gracias por registrarte a Muvick, esperamos que disfrutes mucho tu cuenta, solo necesitamos que nos ayudes a verificar que no eres un &nbsp;robot🤖, tu cuenta si no se confirma en los proximos 3 dias quedará inhabilitada.&nbsp;</div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7485df2c-4eae-41bd-b6ea-3b995c2917e7" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 33px 18px 33px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: start"><span style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: italic; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 14px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; color: #000000; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(234, 234, 234); text-decoration-style: initial; text-decoration-color: initial">Pasos para verificar tu cuenta:</span></div>
<div style="font-family: inherit; text-align: start"><span style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: italic; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 14px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; list-style-position: initial; list-style-image: initial; list-style-type: none; color: #000000; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(234, 234, 234); text-decoration-style: initial; text-decoration-color: initial; counter-increment: depth1 1; padding-inline-start: 0px">1. Da clic al boton que aparece debajo.</span></div>
<div style="font-family: inherit; text-align: start"><span style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: italic; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 14px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; list-style-position: initial; list-style-image: initial; list-style-type: none; color: #000000; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(234, 234, 234); text-decoration-style: initial; text-decoration-color: initial; counter-increment: depth1 1; padding-inline-start: 0px">2. Escribe el código de 4 digitos.</span></div>
<div style="font-family: inherit; text-align: start"><span style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: italic; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 14px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; list-style-position: initial; list-style-image: initial; list-style-type: none; color: #000000; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(234, 234, 234); text-decoration-style: initial; text-decoration-color: initial; counter-increment: depth1 1; padding-inline-start: 0px">3. !SHAZAM! Es todo.🤩</span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="2efe9115-a065-4d64-80d2-0c761865509a" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 33px 18px 33px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center">Código:&nbsp;</div>
<h2 style="text-align: center">${code}</h2><div></div></div></td>
      </tr>
    </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="f72eae45-1ef5-4b13-8ff9-c03633f6c49f">
      <tbody>
        <tr>
          <td align="center" bgcolor="" class="outer-td" style="padding:0px 33px 0px 33px;">
            <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
              <tbody>
                <tr>
                <td align="center" bgcolor="#0c3454" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                  <a href="https://muvick.com/confirm" style="background-color:#0c3454; border:1px solid #333333; border-color:#333333; border-radius:6px; border-width:1px; color:#ffffff; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid;" target="_blank">Verificar correo electronico</a>
                </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="6f909503-3e4d-4f32-8873-a3f4bd429169" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 33px 18px 33px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: start"><span style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 14px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; color: #000000; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(234, 234, 234); text-decoration-style: initial; text-decoration-color: initial">Asi de sencillo es verificar tu cuenta🙌🏼, gracias por elegir Muvick.&nbsp;</span></div>
<div style="font-family: inherit; text-align: start"><br></div>
<div style="font-family: inherit; text-align: center"><span style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 14px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; color: #000000; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(234, 234, 234); text-decoration-style: initial; text-decoration-color: initial"><em><strong>Atentamente</strong></em></span></div>
<div style="font-family: inherit; text-align: center"><span style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 14px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; color: #000000; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(234, 234, 234); text-decoration-style: initial; text-decoration-color: initial"><em><strong>The Muvick Team⭐</strong></em></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"><p class="Unsubscribe--senderName" style="font-size:12px; line-height:20px;">Muvick Team</p><p style="font-size:12px; line-height:20px;"><span class="Unsubscribe--senderAddress">team@muvick.com</span></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a> - <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p></div></td>
                                      </tr>
                                    </table>
                                    <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>
  `;

}
