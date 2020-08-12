import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { parse } from 'csv';

import bsCustomFileInput from 'bs-custom-file-input';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import SimplePage from '../../components/layout/SimplePage';
import { ClassesSelector } from '../../modules/classes';
import { getLocalItem, setLocalItem } from '../../utils/storage';
import AggregateMapping from './AggregateMapping';
import ClassCreator from './ClassCreator';
import { readFileAsText } from './utils';

function FileImport() {
  const [filename, setFilename] = useState('');
  const [propertyNames, setPropertyNames] = useState([]);
  const [rows, setRows] = useState([]);

  const [activeKey, setActiveKey] = useState('aggregateMapping');

  const aggregateClass = useSelector(ClassesSelector.getQueryClass);

  const fileChange = useCallback(
    ({ target }) => {
      console.log(target.files[0]);
      readFileAsText(target.files[0]).then((data) => {
        const parser = parse({ delimiter: ';' }, (err, records) => {
          if (err) {
            console.error(err);
            return;
          }
          const header = records.shift();
          setPropertyNames(header);
          setRows(records);
          setLocalItem('filename', target.files[0].name);
          setLocalItem('data', { header, records });
        });
        parser.write(data);
        parser.end();
      });
    },
    [setPropertyNames, setRows]
  );

  useEffect(() => {
    bsCustomFileInput.init('#fileImport');
    return () => {
      bsCustomFileInput.destroy();
    };
  }, []);

  useEffect(() => {
    setFilename(getLocalItem('filename'), '');
    const data = getLocalItem('data');
    setPropertyNames(data && Array.isArray(data.header) ? data.header : []);
    setRows(data && Array.isArray(data.records) ? data.records : []);
  }, [setFilename, setPropertyNames, setRows]);

  return (
    <SimplePage>
      <Form.Group>
        <Form.File
          id="fileImport"
          label={filename || 'Wählen Sie eine CSV Datei'}
          custom
          onChange={fileChange}
        />
      </Form.Group>
      <Tabs activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
        <Tab eventKey="classCreator" title="Class importer">
          <ClassCreator names={propertyNames} values={rows} />
        </Tab>
        <Tab eventKey="aggregateMapping" title="Aggregate mapping">
          <AggregateMapping
            aggregateClass={aggregateClass}
            names={propertyNames}
            rows={rows}
          />
        </Tab>
      </Tabs>
    </SimplePage>
  );
}
FileImport.propTypes = {};

export default FileImport;
