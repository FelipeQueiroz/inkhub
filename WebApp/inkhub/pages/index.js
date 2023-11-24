import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inkhub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="logo-text">
        <h1>Inkhub</h1>
      </div>
      <div id="login-form">
        <h1>Login</h1>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <input type="submit" value="Submit" />
        </form>
      </div>

      <style jsx>{`
        #login-form {
          width: 400px;
          max-width: 100%;
          margin: 50px auto;
          background-color: lightblue;
          border-radius: 10px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          font-family: "Poppins", sans-serif;
        }

        #login-form h1 {
          text-align: center;
          margin: 0;
          padding: 20px 0;
          font-size: 28px;
          font-weight: bold;
          color: white;
        }

        #login-form form {
          padding: 20px;
          background-color: white;
          border-radius: 10px;
          font-family: "Poppins", sans-serif;
        }

        #login-form form label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          color: gray;
          font-family: "Poppins", sans-serif;
        }

        #login-form form input[type="text"],
        #login-form form input[type="password"] {
          width: 100%;
          padding: 12px;
          border: 1px solid lightgray;
          border-radius: 5px;
          font-size: 16px;
          box-sizing: border-box;
          margin-bottom: 20px;
        }

        #login-form form input[type="submit"] {
          width: 100%;
          padding: 12px;
          background-color: dodgerblue;
          border: none;
          color: white;
          font-size: 16px;
          font-weight: bold;
          border-radius: 5px;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s ease;
        }

        #login-form form input[type="submit"]:hover {
          background-color: deepskyblue;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }

        #logo-text h1 {
          text-align: center;
          margin: 0;
          padding: 20px 0;
          font-size: 55px;
          font-weight: bold;
          color: Black;
        }
      `}</style>
    </div>
  );
}
