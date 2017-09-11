import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Grid, Header, Item, Label, Message, List } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'

import { fetchTask } from '../actions/tasks'
import { getTask } from '../reducers/tasks'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

//  Default for now
const TaskStatusMessage = ({ task }) => (
  <Message>
    <Message.Header>
      Proposal
    </Message.Header>
    <p>
      This task is in the proposal stage.
    </p>
    <Form.Input
      type='text'
      placeholder='Enter task reward'
    />
  </Message>
)

class Task extends Component {
  constructor(props) {
    super(props)
    this.createTagsList = this.createTagsList.bind(this)
  }

  componentWillMount() {
    const {
      fetchTask, match: {
        params: { id }
      }
    } = this.props
    fetchTask(id)
  }

  createTagsList() {
    return this.props.task.tags.map((tag) => {
      return <Label
        size='tiny'
        key={tag}
      >
        {tag}
      </Label>
    })
  }

  render() {
    const { task } = this.props

    return (
      <Layout>
        <Head title='Task'/>
        <div className='task'>
          {task ? (
            <Grid divided='vertically'>
              <Grid.Row
                columns={2}
              >
                <Grid.Column
                >
                  <Header style={{textDecoration: 'underline'}} as='h2'>{task.title}</Header>
                  <Item>
                    <List
                      horizontal
                      bulleted
                    >
                      Tags: {this.createTagsList()}
                    </List>
                  </Item>
                  <Item>
                    Issue url:
                    <a target='_blank' href={task.issueURL}>
                      {task.issueURL}
                    </a>
                  </Item>
                  <Item as='p'>
                    Created: {new Date(task.createdAt).toDateString()}
                  </Item>
                </Grid.Column>
                <Grid.Column>
                  <TaskStatusMessage />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <ReactMarkdown source={task.spec}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ) : 'Loading task...'
          }
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  task: getTask(state, id)
})

const mapDispatchToProps = dispatch => ({
  fetchTask: id => dispatch(fetchTask(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Task)