import React, {useState} from 'react'
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const API = 'http://127.0.0.1:8000/predict';

export default function Home() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(selectedImage);

    if (!selectedImage) return;

    const data = new FormData();
    data.append('upload', selectedImage);

    const res = await fetch(API, 
      {
        method: 'POST',
        body: data
      }
    ).then(res => res.json());

    setPrediction(res.prediction);
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Cat Dog - Classifier</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className={styles.title}>
            Cat Dog - Classifier
        </h1>

        <p className={styles.description}>
          Classifies images into cat or dog using CNN in Keras
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Get started &rarr;</h3>
            <p>To start upload an image from your device</p>
            <input type="file" accept="image/*" onChange={e => setSelectedImage(e.target.files[0])} />
            <button className={styles.upload} onClick={handleUpload} disabled={!selectedImage}>{loading ? "Loading..." : "Upload"}</button>
            {
              prediction && (
                prediction == "cat" && (
                  <p> Your image is a cat 🐱</p>
                )
                ||
                prediction == "dog" && (
                  <p> Your image is a dog 🐶</p>
                )
                ||
                prediction == "error" && (
                  <p>Not really sure what your image is ...</p>
                )
              )
            }
          </div>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }

        input[type="file"] {
          padding: 10px;
          border: 1px solid #eaeaea;
          border-radius: 5px;
        }

        input[type="file"]::file-selector-button {
          padding: 10px;
          border: 1px solid #eaeaea;
          border-radius: 5px;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
