import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Datepicker from '../../../stripes-components/lib/Datepicker/Datepicker';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Textfield from '../../../stripes-components/lib/TextField';
import TextField from '@folio/stripes-components/lib/TextField/TextField';
import moment from 'moment';
import CalendarUtils from '../../CalendarUtils';

class InputFields extends React.Component {
    static propTypes = {
      onDateChange: PropTypes.func.isRequired,
      onNameChange: PropTypes.func.isRequired,
      nameValue: PropTypes.string.isRequired,
    };


    constructor() {
      super();
      this.setName = this.setName.bind(this);
      this.setEndDate = this.setEndDate.bind(this);
      this.setStartDate = this.setStartDate.bind(this);
      this.onBlur = this.onBlur.bind(this);
    }

    onBlur() {
      if (this.props.nameValue !== undefined && this.props.nameValue !== null && this.props.nameValue.length > 0) {
        this.setState({
          errorBoolean: false,
        });
      } else {
        this.setState({
          errorBoolean: true,
        });
      }
    }

    parseDateToString(e) {
      let str = '';
      for (const p in e) {
        if (e.hasOwnProperty(p) && p != 'preventDefault') {
          str += e[p];
        }
      }
      return str;
    }

    componentDidMount() {
      console.log(this.props);
    }

    setStartDate(e) {
      this.props.onDateChange(true, this.parseDateToString(e));
    }

    setEndDate(e) {
      this.props.onDateChange(false, this.parseDateToString(e));
    }

    setName(e) {
      this.props.onNameChange(e.target.value);
    }

    render() {
      let modifyStart;
      let modifyEnd;
      let modifyName;
      const errorMessage = null;
      if (this.props.modifyPeriod) {
        modifyStart = <Field
          name="item.startDate"
          component={Datepicker}
          label={CalendarUtils.translateToString('ui-calendar.validFrom', this.props.stripes.intl)}
          dateFormat={CalendarUtils.translateToString('ui-calendar.dateFormat', this.props.stripes.intl)}
          onChange={this.setStartDate}
          required
        />;

        modifyEnd = <Field
          name="item.endDate"
          component={Datepicker}
          label={CalendarUtils.translateToString('ui-calendar.validTo', this.props.stripes.intl)}
          dateFormat={CalendarUtils.translateToString('ui-calendar.dateFormat', this.props.stripes.intl)}
          onChange={this.setEndDate}
        />;

        if (this.state !== null && this.state !== undefined && this.state.errorBoolean !== null && this.state.errorBoolean !== undefined && this.state.errorBoolean) {
          modifyName = <TextField
            label={CalendarUtils.translateToString('ui-calendar.name', this.props.stripes.intl)}
            value={this.props.modifyPeriod.name || ''}
            ref="periodName"
            name="periodName"
            id="input-period-name"
            component={Textfield}
            onChange={this.setName}
            error={CalendarUtils.translateToString('ui-calendar.fillIn', this.props.stripes.intl)}
            required
          />;
        } else {
          modifyName = <TextField
            label={CalendarUtils.translateToString('ui-calendar.name', this.props.stripes.intl)}
            value={this.props.modifyPeriod.name || ''}
            ref="periodName"
            name="periodName"
            id="input-period-name"
            component={Textfield}
            onChange={this.setName}
            required
          />;
        }
      } else {
        modifyStart = <Field
          name="item.startDate"
          component={Datepicker}
          label={CalendarUtils.translateToString('ui-calendar.validFrom', this.props.stripes.intl)}
          dateFormat={CalendarUtils.translateToString('ui-calendar.dateFormat', this.props.stripes.intl)}
          onChange={this.setStartDate}
        />;

        modifyEnd = <Field
          name="item.endDate"
          component={Datepicker}
          label={CalendarUtils.translateToString('ui-calendar.validTo', this.props.stripes.intl)}
          dateFormat={CalendarUtils.translateToString('ui-calendar.dateFormat', this.props.stripes.intl)}
          onChange={this.setEndDate}
        />;


        if (this.state !== null && this.state !== undefined && this.state.errorBoolean !== null && this.state.errorBoolean !== undefined && this.state.errorBoolean) {
          modifyName =
            <Field
              name="periodName"
              component={Textfield}
              llabel={CalendarUtils.translateToString('ui-calendar.name', this.props.stripes.intl)}
              ref="periodName"
              id="input-period-name"
              onBlur={this.onBlur}
              onChange={this.setName}
              required
              error={CalendarUtils.translateToString('ui-calendar.fillIn', this.props.stripes.intl)}
            />;
        } else {
          modifyName =
            <Field
              name="periodName"
              component={Textfield}
              label={CalendarUtils.translateToString('ui-calendar.name', this.props.stripes.intl)}
              ref="periodName"
              id="input-period-name"
              onBlur={this.onBlur}
              onChange={this.setName}
              required
            />;
        }
      }

      return (
        <div>
          <Row>
            <Col sm={4}>
              {modifyStart}
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              {modifyEnd}
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              {modifyName}
            </Col>
          </Row>
        </div>
      );
    }
}

export default reduxForm({
  form: 'InputFields',
})(InputFields);
