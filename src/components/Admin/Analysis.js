import React, { Component } from 'react';
import { Button, Container, Divider, Dropdown, Form, Grid, Header, Icon, Input, Modal, Table } from 'semantic-ui-react';
import axios from 'axios';

export default class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: this.props.employees,
      openFailModal: false,
      analysis: []
    }
  }

  handleEmpId = (event) => {
    this.setState({ empId: event.target.value }, () => {
      axios.get('/master/analysis', { params: { empId: Number(this.state.empId) } })
        .then(res => {
          if(res.data.err) { this.setState({ openFailModal: true }); }
          else if(res.data.analysis) { this.setState({ analysis: res.data.analysis }); }
        });
    });
  }

  displayTable = (analysis) => {
    if(analysis.length === 0) { return null; }
    else {
      console.log(analysis);
      return (
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Punctuality</Table.HeaderCell>
              <Table.HeaderCell>Entry</Table.HeaderCell>
              <Table.HeaderCell>Exit</Table.HeaderCell>
              <Table.HeaderCell>Effort</Table.HeaderCell>
              <Table.HeaderCell>Efficiency</Table.HeaderCell>
              <Table.HeaderCell>seriousness</Table.HeaderCell>
              <Table.HeaderCell singleLine>Time Wastage</Table.HeaderCell>
              <Table.HeaderCell singleLine>Reason For Leave</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              analysis.map((each, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>
                      {
                        (() => {
                          var date = each.date.split('T')[0].split('-');
                          return date[2]+'-'+date[1]+'-'+date[0];
                        })()
                      }
                    </Table.Cell>
                    <Table.Cell>{ each.punctuality }</Table.Cell>
                    <Table.Cell>{ each.instatus }</Table.Cell>
                    <Table.Cell>{ each.outstatus }</Table.Cell>
                    <Table.Cell>{ each.effort }</Table.Cell>
                    <Table.Cell>{ each.efficiency }</Table.Cell>
                    <Table.Cell>{ each.seriousness }</Table.Cell>
                    <Table.Cell>{ each.timewastage }</Table.Cell>
                    <Table.Cell>
                      {
                        (() => {
                          switch (each.reasonforleave) {
                            case 1: return 'Accepted';
                            case -1: return 'Rejected';
                            case 0: return '-- N.A --';
                            default: return null;
                          }
                        })()
                      }
                    </Table.Cell>
                  </Table.Row>
                );
              })
            }
          </Table.Body>
        </Table>
      );
    }
  }

  closeFailModal = () => { this.setState({ openFailModal: false }); }

  render() {
    var employees = this.state.employees;
    var analysis = this.displayTable(this.state.analysis);
    return (
      <Container>
        <Grid>
          <Grid.Row centered>
            <Form inverted>
              <Form.Field name='empId' onChange={this.handleEmpId} control='select'>
                {
                  employees.map((employee, index) => {
                    var value = employee.emp_id+' - '+employee.fullname;
                    return (
                      <option value={employee.emp_id} key={index}>{value}</option>
                    );
                  })
                }
              </Form.Field>
            </Form>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column>
              { analysis }
            </Grid.Column>
          </Grid.Row>
          <Modal open={this.state.openFailModal} onClose={this.closeFailModal} basic size='small'>
            <Header icon='warning sign' content='Failed in doing that!' />
            <Modal.Actions>
              <Button color='red' inverted onClick={this.openFailModal}>
                <Icon name='repeat' /> Try again
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid>
      </Container>
    );
  }
}
