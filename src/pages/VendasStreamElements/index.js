import React, { Component } from 'react';

import { format } from 'date-fns';
import apiStreamElements from '../../services/apiStreamElements';

export default class VendasStreamElements extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      limit: 100000,
      page: 1,
      total_page: 0,
      itens: [],
      clipboard: ''
    };
  }

  async componentDidMount() {
    const { limit, page } = this.state;

    this.carregar(page, limit);
  }

  carregar = async (page, limit) => {
    const itemName = decodeURIComponent(this.props.match.params.nameItem);

    this.setState({
      itens: []
    });

    if (itemName.indexOf(' ') >= 0) {
      this.setState({
        total: 422,
        itens: []
      });
    } else {
      const response = await apiStreamElements.getLojaProdutoVendas({
        produto: itemName,
        limit,
        page
      });
      this.setState({
        total: response._total,
        itens: response.docs,
        total_page: Math.ceil(response._total / limit),
        page,
        limit
      });
    }
  };

  paginaAnterior = async () => {
    let { limit, page } = this.state;
    page--;
    if (page <= 1) page = 1;
    this.carregar(page, limit);
  };

  proximaPagina = async () => {
    let { limit, page, total_page } = this.state;
    page++;
    if (page >= total_page) page = total_page;
    this.carregar(page, limit);
  };

  copyBuyers = async () => {
    const { itens } = this.state;
    const clipBoard = itens.map(iten => iten.redeemer.username);
    this.setState({
      clipboard: clipBoard.join(' ')
    });
  };

  closeBuyers = () => {
    this.setState({
      clipboard: ''
    });
  };

  changePageSelect = async e => {
    const { limit } = this.state;
    this.carregar(e.target.value, limit);
  };

  changeLimitSelect = async e => {
    this.carregar(1, e.target.value);
  };

  render() {
    const { itens, total, page, limit, total_page, clipboard } = this.state;

    const countStart = limit * page - limit;

    const paginasArray = [];
    for (let i = 1; i <= total_page; i++) {
      paginasArray.push(i);
    }

    if (itens.length === 0) {
      return (
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">
                    Não foi possivel carregar as vendas.
                  </h3>
                  {/*  */}
                </div>
                <div className="box-body">
                  <p>
                    {total === 422
                      ? 'Provavelmente pois existem espaços no nome do item, isso e um problema com a API de busca do Stream Elements, no propio painel deles caso tente procurar algo com espaços vai dar erro.'
                      : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="content">
        {clipboard !== '' ? (
          <div className="row">
            <div className="col-md-12">
              <pre
                style={{
                  'white-space': 'pre-wrap'
                }}
              >
                {clipboard}
              </pre>
              <button
                type="button"
                className="btn btn-danger btn-xs"
                onClick={this.closeBuyers}
              >
                Fechar Compradores
              </button>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                {/*  */}
                <div className="box-header">
                  <h3 className="box-title">Lista de todas as vendas</h3>

                  <div
                    className="box-tools"
                    style={{
                      display: 'flex'
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-info btn-xs"
                      onClick={this.copyBuyers}
                    >
                      Copiar Compradores
                    </button>

                    <div
                      className="input-group input-group-sm hidden-xs"
                      style={{ width: 220 }}
                    >
                      <div className="input-group-addon">
                        Quantidade por página
                      </div>
                      <select
                        className="form-control pull-right"
                        onChange={this.changeLimitSelect}
                        defaultValue={limit}
                      >
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                        <option value="1000">1.000</option>
                        <option value="2000">2.000</option>
                        <option value="4000">4.000</option>
                        <option value="5000">5.000</option>
                        <option value="10000">10.000</option>
                        <option value="50000">50.000</option>
                        <option value="100000">100.000</option>
                        <option value="1000000">1.000.000</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="box-body no-padding">
                  {/*  */}
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <th>#</th>
                        <th>Nome do Item</th>
                        <th>Comprador</th>
                        <th>Input</th>
                        <th>Data da Compra</th>
                      </tr>
                      {itens.map((iten, index) => {
                        return (
                          <tr key={iten._id}>
                            <td>{countStart + index + 1}</td>
                            <td>{iten.item.name}</td>
                            <td>{iten.redeemer.username}</td>
                            <td>{iten.input[0] || ''}</td>
                            <td>
                              {format(
                                new Date(iten.createdAt),
                                'dd/MM/yyyy HH:ii:ss'
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {/*  */}
                </div>
                {/*  */}
                <div className="box-footer clearfix">
                  <span>
                    Exibindo de {countStart + 1} a{' '}
                    {limit * page - (limit - itens.length)} de um total de{' '}
                    {total}
                  </span>
                  <ul className="pagination pagination-sm no-margin pull-right">
                    <li>
                      <a onClick={this.paginaAnterior}>« Página Anterior</a>
                    </li>

                    <li>
                      <select
                        style={{
                          padding: '5px 10px',
                          fontSize: '12px',
                          lineHeight: '1.5',
                          position: 'relative',
                          float: 'left',
                          padding: '6px 12px',
                          marginLeft: '-1px',
                          lineHeight: '1.42857143',
                          color: '#337ab7',
                          textDecoration: 'none',
                          backgroundColor: '#fff',
                          border: '1px solid #ddd'
                        }}
                        onChange={this.changePageSelect}
                        defaultValue={page}
                      >
                        {paginasArray.map(iten => {
                          return (
                            <option key={iten} value={iten}>
                              {iten}
                            </option>
                          );
                        })}
                      </select>
                    </li>
                    <li>
                      <a onClick={this.proximaPagina}>Proxima Página »</a>
                    </li>
                  </ul>
                </div>
                {/*  */}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
