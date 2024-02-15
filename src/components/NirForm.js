import { compose } from 'ramda';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useForm } from 'react-hook-form';
import toastr from 'toastr';
import { getZipDepartments } from '../helpers/department';
import getMonths from '../helpers/month';
import { generateNIR } from '../helpers/nir';
import populateNilOrEmpty from '../helpers/populateNilOrEmpty';
import { getYears } from '../helpers/year';

const NirForm = () => {
  const [nir, setNir] = useState(null);
  const [nirObj, setNirObj] = useState({});
  const { handleSubmit, register } = useForm();

  const onSubmit = (values) => {
    const [nir, data] = compose(generateNIR, populateNilOrEmpty)(values);
    setNir(nir);
    setNirObj(data);
  };

  const onError = (error) => {
    console.log(error);
  };
  return (
    <div className="page">
      <h2 className="title">Générateur de NIR</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit, onError)} className="form-nir">
          <div className="form-control">
            <select id="sex" {...register('sex')}>
              <option value="">-- Sexe --</option>
              <option value="1">Homme</option>
              <option value="2">Femme</option>
            </select>
          </div>
          <div className="form-control">
            <select id="year" {...register('year')}>
              <option value="">-- Année --</option>
              {getYears().map(({label, value}) => (
                <option key={`${value}-${label}`} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <select id="month" {...register('month')}>
              <option value="">-- Mois --</option>
              {getMonths.sort().map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <select id="department" {...register('department')}>
              <option value="">-- Département --</option>
              {getZipDepartments().map((v) => (
                <option key={v[0]} value={v[0]}>
                  {v[1]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button type="submit" id="btn-gen">générer</button>
          </div>
        </form>
        <CopyToClipboard onCopy={() => nir && toastr.success('Copié')} text={nir}>
          <div className="result">
              <span>
                {nirObj.sex} {nirObj.year} {nirObj.month} {nirObj.department}{' '}
                {nirObj.comm} {nirObj.ordre} {nirObj.key}
              </span>
          </div>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default NirForm;
