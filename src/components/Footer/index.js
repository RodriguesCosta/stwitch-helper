import React from 'react';

export default function Footer() {
  return (
    <div>
      <footer className="main-footer">
        <div className="pull-right hidden-xs">
          <b>Versão</b> 0.1.0
        </div>
        <strong>
          Desenvolvidor por{' '}
          <a href="http://rodriguescosta.com" target="blank">
            Rodrigues Costa
          </a>
          .
        </strong>
      </footer>
    </div>
  );
}
