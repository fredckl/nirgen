import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { generateNIR } from '../helpers/nir';
import { getYears } from '../helpers/year';
import getMonths from '../helpers/month';
import { getZipDepartments } from '../helpers/department';
import removeNilAndEmpty from '../helpers/removeNilAndEmpty';
import { compose, tap } from 'ramda';

const NirForm = () => {
  const [nir, setNir] = useState(null)
  const { handleSubmit, register } = useForm({
    defaultValues: {
      basenir: null,
      qts: null,
      sex: null
    }
  })

  const onSubmit = (values) => setNir(compose(generateNIR, tap(console.log), removeNilAndEmpty)(values))

  const onError = error => {
    console.log(error)
  }
  return (
    <div className="page">
      <h2>Générateur de NIR</h2>
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
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
            {getYears().map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <select id="month" {...register('month')}>
            <option value="">-- Mois --</option>
            {getMonths.sort().map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <select id="department" {...register('department')}>
            <option value="">-- Département --</option>
            {getZipDepartments().map((v) => (
              <option key={v[0]} value={v[0]}>{v[1]}</option>
            ))}
          </select>
        </div>

        <div><button type="submit">générer</button></div>
      </form>
      <div className="result">{nir}</div>
    </div>
    </div>
  )
}

export default NirForm
