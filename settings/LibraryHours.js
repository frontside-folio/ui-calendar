import {sortBy} from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import EntryManager from '@folio/stripes-smart-components/lib/EntryManager';
import {FormattedMessage} from 'react-intl';
import ServicePointDetails from './ServicePointDetails';
import ErrorBoundary from "../ErrorBoundary";
import CloneSettings from "./CloneSettings";

class LibraryHours extends React.Component {

    static manifest = Object.freeze({
        entries: {
            type: 'okapi',
            records: 'servicepoints',
            path: 'service-points',
        },
        query: {},
        periodId: {},
        periods: {
            type: 'okapi',
            records: 'openingPeriods',
            path: 'calendar/periods/%{query}/period?withOpeningDays=true&showPast=true&showExceptional=false',
            fetch: false,
            accumulate: true,
            POST: {
                path: 'calendar/periods/%{query}/period',
            },
            DELETE: {
                path: 'calendar/periods/%{query}/period/%{periodId}',
            }
        }
    });

    constructor() {
        super();
        this.onChildToggle = this.onChildToggle.bind(this);
        this.state = {
            toggleCloneSettings: false,
        }
    }

    translate(id) {
        return this.props.stripes.intl.formatMessage({
            id: `ui-organization.settings.servicePoints.${id}`
        });
    }


    onChildToggle(isOpen) {
        this.setState({toggleCloneSettings: isOpen});
    }



    render() {
        let {toggleCloneSettings} = this.state;
        let that = this;

        function renderCloneSettings() {
            if (toggleCloneSettings) {
                return <CloneSettings {...this.props} onToggle={that.onChildToggle()}/>
            }
        }

        return (
            <ErrorBoundary>
                <EntryManager
                    {...this.props}
                    paneTitle={this.props.label}
                    entryList={sortBy((this.props.resources.entries || {}).records || [], ['name'])}
                    detailComponent={ServicePointDetails}
                    entryFormComponent={() => ({})}
                    entryLabel={this.props.label}
                    nameKey="name"
                    parentMutator={this.props.mutator}
                    permissions={{
                        put: 'settings.calendar.disabled',
                        post: 'settings.calendar.disabled',
                        delete: 'settings.calendar.disabled',
                    }}
                />
                {renderCloneSettings()}
            </ErrorBoundary>
        );
    }
}

LibraryHours.propTypes = {
    label: PropTypes.string.isRequired,
    resources: PropTypes.shape({
        entries: PropTypes.shape({
            records: PropTypes.arrayOf(PropTypes.object),
        }),
        periods: PropTypes.shape({
            records: PropTypes.arrayOf(PropTypes.object),
        })
    }).isRequired,
    mutator: PropTypes.shape({
        entries: PropTypes.shape({
            GET: PropTypes.func,
        }),
        periods: PropTypes.shape({
            reset: PropTypes.func,
            GET: PropTypes.func,
            POST: PropTypes.func,
            DELETE: PropTypes.func,
        }),
        query: PropTypes.shape({
            replace: PropTypes.func,
        }),
        periodId: PropTypes.shape({
            replace: PropTypes.func,
        }),
    }).isRequired,
    stripes: PropTypes.shape({
        intl: PropTypes.object.isRequired,
    }),
};
export default LibraryHours;
