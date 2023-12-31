import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
    <main>
      about page
      <PageHero title='about' />
      <Wrapper className='page section section-center'>
        <img src={aboutImg} alt='nice desk' />

        <article>
          <div className='title'>
            <h2>Our Story</h2>
            <div className='underline'></div>
          </div>

          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
            quasi neque optio possimus exercitationem. Aliquid quaerat harum
            tempora suscipit? Quo eum cum laborum architecto itaque facilis iste
            praesentium reprehenderit ullam! Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Animi quasi neque optio possimus
            exercitationem. Aliquid quaerat harum empora suscipit? Quo eum cum
            laborum architecto itaque facilis iste praesentium reprehenderit
            ullam!



            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit cum reiciendis
            alias
            veritatis ad autem quam tempore odio distinctio voluptatibus rem soluta illo
            possimus quos a, aperiam accusamus obcaecati neque.

            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repudiandae corrupti quisquam consequuntur pariatur unde eaque. Eligendi autem,
            aliquam necessitatibus eveniet consectetur inventore sunt amet quod, soluta reprehenderit, quas labore voluptas?
          </p>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
