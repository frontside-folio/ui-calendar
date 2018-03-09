import React from 'react';
import { Field, FieldArray } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import TextField from '@folio/stripes-components/lib/TextField';
import OpeningHourComponent from './OpeningHourComponent';

const OpeningDayComponent = ({ fields, intl, days }) =>
  (<div>
    {(fields || []).map((openingDay, index) => (
      <div key={index}>
        <Row>
          <Col xs={12} sm={1}>
            <FormattedMessage id={`ui-calendar.${days[index]}`} />
            <Field
              label=""
              name={`${openingDay}.day`}
              component={TextField}
              disabled="true"
              hidden
            />
          </Col>
          <Col xs={12} sm={1}>
            <Field
              label={intl.formatMessage({ id: 'ui-calendar.settings.opening' })}
              name={`${openingDay}.open`}
              type="checkbox"
              id={`open-${index}`}
              component={Checkbox}
            />
          </Col>
          <Col xs={12} sm={1}>
            <Field
              label={intl.formatMessage({ id: 'ui-calendar.settings.allDay' })}
              name={`${openingDay}.allDay`}
              type="checkbox"
              id={`allDay-${index}`}
              component={Checkbox}
            />
          </Col>
          <Col xs={12} sm={9}>
            <FieldArray name={`${openingDay}.openingHour`} component={OpeningHourComponent} intl={intl} />
          </Col>
        </Row>
        <hr />
      </div>
    ))}
  </div>
  );

export default OpeningDayComponent;