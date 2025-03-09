import './styles/global.scss'
import './styles/layout.scss'

import HeroLayout from './layouts/HeroLayout'
import TextInputOutline from './components/ui/form-elements/TextInputOutline'
import { useId } from 'react'
import NumberInputOutline from './components/ui/form-elements/NumberInputOutline'
import TextAreaOutline from './components/ui/form-elements/TextAreaOutline'
import DropdownOutline from './components/ui/form-elements/DropdownOutline'
import DatePickerOutline from './components/ui/form-elements/DatePickerOutline'
import {
  LocalizationProvider,
  useLocalization,
} from './context/LocalizationContext'
import ButtonPrimary from './components/ui/buttons/ButtonPrimary'
import SegmentedButton from './components/ui/buttons/SegmentedButton'
import FAB from './components/ui/buttons/FAB'
import Accordion from './components/ui/Accordion'

function TestLocalization() {
  /* const { lang, setLang } = useLocalization() */

  return (
    <>
      <HeroLayout page="about-us" section="hero" divider={true}></HeroLayout>
      <section className="grid padding-y-5xl">
        <div className="row">
          <div className="col-12">
            <h1>Custom UI components</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <TextInputOutline
              id={useId()}
              name="name"
              label="Text input"
              helperText="Helper text"
              error={false}
            ></TextInputOutline>
          </div>
          <div className="col-4">
            <NumberInputOutline
              id={useId()}
              name="number"
              label="Number input"
              helperText="Helper text"
              min={2}
              max={4}
              error={false}
            ></NumberInputOutline>
          </div>
          <div className="col-4">
            <DropdownOutline
              id={useId()}
              name="dropdown"
              label="Dropdown"
              helperText="Helper text"
              error={false}
              options={[
                { label: 'Option 1', value: 1 },
                { label: 'Option 2', value: 2 },
              ]}
            ></DropdownOutline>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <TextAreaOutline
              id={useId()}
              name="textarea"
              label="Text area"
              helperText="Helper text"
              maxLength={250}
              error={false}
            ></TextAreaOutline>
          </div>
          {/* <div className="col-3">
            <DatePickerOutline
              id={useId()}
              name="calendar"
              label="Calendar"
              helperText="Helper text"
              error={false}
            ></DatePickerOutline>
          </div>
          <div className="col-2">
            <ButtonPrimary
              label={lang === 'en' ? 'Change to Hungarian' : 'Váltás angolra'}
              onClick={() => {
                setLang(lang === 'en' ? 'hu' : 'en')
              }}
            ></ButtonPrimary>
          </div> */}
        </div>
        <div className="row">
          <div className="col-4">
            <SegmentedButton
              labels={['Button 1', 'Button 2', 'Button 3']}
            ></SegmentedButton>
          </div>
          <div className="col-1">
            <FAB icon="arrow_upward"></FAB>
          </div>
          <div className="col-7">
            <Accordion
              label="Szükséges jogosítvány a quad vezetéséhez?"
              text="Igen, a túrákon való részvételhez B kategóriás jogosítványra van szükség, mivel a quadok motorja és teljesítménye ezt megköveteli."
            ></Accordion>
          </div>
        </div>
      </section>
    </>
  )
}

function App() {
  return (
    <LocalizationProvider>
      <TestLocalization></TestLocalization>
    </LocalizationProvider>
  )
}

export default App
