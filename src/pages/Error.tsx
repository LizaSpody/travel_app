import React from 'react';
import { useRouteError } from 'react-router-dom';

interface CustomError {
  statusText?: string;
  message?: string;
}

interface CustomError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError();

  if (typeof error === 'object' && error !== null) {
    const customError = error as CustomError;

    console.error(customError);

    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{customError.statusText || customError.message}</i>
        </p>
      </div>
    );
  } else {
    console.error('Unexpected error:', error);

    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>An unknown error occurred.</i>
        </p>
      </div>
    );
  }
}
