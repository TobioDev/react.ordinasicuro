import React, { Component, useState, Fragment } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

const Faq = () => {
  const [statoAttivo, setStatoAttivo] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = statoAttivo === index ? -1 : index

    setStatoAttivo(newIndex)
  }

  const activeIndex = statoAttivo




  return (
    <Fragment>
      <h1 className="titolo mb0">F.A.Q.</h1>
      <p className="sottotitolo gray i">Domande Frequenti</p>
      <div className="flex items-center justify-center w-100 mb5">
        <Accordion styled>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
            className="w-100" 
          >
            <Icon name='dropdown' />
            <span className="titolo">What is a dog?</span>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>
              A dog is a type of domesticated animal. Known for its loyalty and
              faithfulness, it can be found as a welcome guest in many households
              across the world.
            </p>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            What kinds of dogs are there?
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>
              There are many breeds of dogs. Each breed varies in size and
              temperament. Owners often select a breed of dog that they find to be
              compatible with their own lifestyle and desires from a companion.
            </p>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            How do you acquire a dog?
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <p>
              Three common ways for a prospective owner to acquire a dog is from
              pet shops, private owners, or shelters.
            </p>
            <p>
              A pet shop may be the most convenient way to buy a dog. Buying a dog
              from a private owner allows you to assess the pedigree and
              upbringing of your dog before choosing to take it home. Lastly,
              finding your dog from a shelter, helps give a good home to a dog who
              may not find one so readily.
            </p>
          </Accordion.Content>
        </Accordion>
      </div>

    </Fragment>


  )
}

export default Faq