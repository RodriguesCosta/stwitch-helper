import React, { Component } from 'react';

import { format } from 'date-fns';
import apiStreamElements from '../../services/apiStreamElements';

export default class LojaStreamElements extends Component {
  constructor() {
    super();
    this.state = {
      itens: []
    };
  }

  async componentDidMount() {
    this.setState({ itens: await apiStreamElements.getLojaProdutos() });
  }

  render() {
    const { itens } = this.state;

    return (
      <div className="content">
        <div className="row">
          {itens.map(iten => {
            return (
              <div className="col-md-4" key={iten._id}>
                <div className="box box-widget widget-user">
                  <div
                    className="widget-user-header bg-black"
                    style={{
                      background: `url("${iten.alert.graphics.src}") center center`
                    }}
                  />
                  <div
                    className="box-footer"
                    style={{
                      paddingTop: 0
                    }}
                  >
                    <div className="row">
                      <div className="col-sm-12">
                        <h4>
                          <a
                            href={`#/VendasStreamElements/${encodeURIComponent(
                              iten.name
                            )}`}
                          >
                            {iten.name}
                          </a>
                        </h4>
                        <p>{iten.description}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 border-right">
                        <div className="description-block">
                          <h5 className="description-header">{iten.cost}</h5>
                          <span className="description-text">PREÇO</span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="description-block">
                          <h5 className="description-header">
                            {format(new Date(iten.createdAt), 'dd/MM/yyyy')}
                          </h5>
                          <span className="description-text">CADASTRO</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
