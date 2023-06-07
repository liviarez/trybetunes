import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  state = {
    user: [],
    isLoading: true,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const responseProfileUser = await getUser();
    this.setState({ user: responseProfileUser, isLoading: false });
  }

  render() {
    const { user, isLoading } = this.state;
    const { name, email, image, description } = user;

    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoading ? <Loading /> : (
            <section>
              <img data-testid="profile-image" src={ image } alt="" />
              <div>
                <h4>Nome</h4>
                <p>{name}</p>
              </div>
              <div>
                <h4>E-mail</h4>
                <p>{email}</p>
              </div>
              <div>
                <h4>Descrição</h4>
                <p>{description}</p>
              </div>
              <Link to="/profile/edit">Editar perfil</Link>
            </section>
          )
        }
      </div>
    );
  }
}
export default Profile;
