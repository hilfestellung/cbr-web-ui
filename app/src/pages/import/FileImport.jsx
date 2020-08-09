import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { parse } from 'csv';

import bsCustomFileInput from 'bs-custom-file-input';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import SimplePage from '../../components/layout/SimplePage';
import { readFileAsText } from './utils';
import ClassCreator from './ClassCreator';
import { getLocalItem, setLocalItem } from '../../utils/storage';

function FileImport() {
  const [filename, setFilename] = useState('');
  const [propertyNames, setPropertyNames] = useState([]);
  const [rows, setRows] = useState([]);

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
      <ClassCreator names={propertyNames} values={rows} />
    </SimplePage>
  );
}
FileImport.propTypes = {};

export default FileImport;
