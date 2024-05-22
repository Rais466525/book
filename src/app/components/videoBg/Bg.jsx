import Styles from './Bg.module.css'

export default function Bg() {
   return (
      <main>
         <video className={Styles.video}
         loop preload="auto"
         autoPlay playsInline muted>
            <source src="/rainBG.mp4" type="video/mp4" />
            Your browser does not support the video tag.
         </video>
      </main>
   )
}