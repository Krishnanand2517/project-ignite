import { Likes } from "../components";

const Article = () => {
  const article = {
    title: "6 React Hooks You Need to Know",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus accusantium enim officiis, magni, laborum numquam, quaerat ut natus harum nisi ipsam ipsa neque alias iusto excepturi corporis. Obcaecati, enim soluta asperiores fuga laborum velit distinctio non molestiae harum quas, saepe ullam odio voluptatum fugiat aut. Reiciendis minima velit maiores illum placeat dolorem illo nemo fugit officia optio! Nemo obcaecati consequuntur inventore iure, quisquam possimus exercitationem voluptas minus quam at non iusto animi esse eos! Temporibus quis similique error, obcaecati rem blanditiis amet assumenda dolorum quos quam quo aspernatur quia, recusandae quibusdam ullam, itaque praesentium cupiditate fuga ipsam ducimus harum soluta dolores possimus eos. Explicabo libero aliquam aliquid, nam beatae, nihil, provident vero dolorem sint illo quibusdam quos odit vitae obcaecati quam possimus similique inventore. Fugit expedita, incidunt veritatis laboriosam maxime iure blanditiis aliquam molestiae nam porro quod tempore nihil officiis. Provident exercitationem ut dolore accusantium aliquid delectus repudiandae ad sint dolorum, recusandae non a adipisci neque maxime in reiciendis amet distinctio quidem sit rerum corporis? Aperiam eligendi minima, vero dolores accusamus blanditiis optio alias maxime quidem laudantium. Enim dolor cum ipsa delectus nostrum dolorum quae tempore saepe distinctio quos aliquid, eaque doloremque facere rerum, optio harum. Rerum a optio repellendus sit minima animi. Dolores ullam illum corporis mollitia repellendus similique? Mollitia molestiae deleniti, eaque, exercitationem officia libero veniam facere similique cupiditate optio iusto reiciendis id debitis. Ad sunt, necessitatibus nesciunt rerum tenetur dolor quae quisquam. Quos a in veniam excepturi dignissimos, optio saepe earum iure numquam tempore vel ut mollitia laborum ex vero corporis hic, minus consequatur. Harum delectus dolor itaque? Similique quam, debitis deleniti possimus sequi aliquid quo dolore unde commodi ipsam excepturi iure sed maiores necessitatibus ut, officiis tempore. Facere vel cupiditate nesciunt optio possimus, voluptatibus quos voluptatum placeat illum quo veritatis officia inventore, quaerat qui dicta? Dicta.",
  };
  return (
    <div className="w-full pt-32 pb-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <h1 className="mb-8 text-4xl 2xl:text-6xl font-fira font-bold text-primary">
        {article.title}
      </h1>
      <p className="w-full 2xl:text-2xl text-secondary font-inconsolata">
        {article.content}
      </p>
      <Likes likesCount={23} className="mt-12" />
    </div>
  );
};

export default Article;
