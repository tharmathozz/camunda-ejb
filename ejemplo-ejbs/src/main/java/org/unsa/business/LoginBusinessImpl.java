package org.unsa.business;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Stateless;

import org.unsa.camunda.CamundaApi;
import org.unsa.common.dao.LoginDao;
import org.unsa.dto.RolDto;
import org.unsa.dto.SessionDto;
import org.unsa.dto.UserDto;
import org.unsa.dto.camunda.UserCamundaDto;
import org.unsa.identity.TokenAuthentication;
import org.unsa.identity.TokenHandler;



@Stateless
public class LoginBusinessImpl implements LoginBusiness {
	
	@EJB
	CamundaApi camundaApi;
	
	private LoginDao loginDao;
	
	public LoginDao getService() {
		return this.loginDao;
	}
	@PostConstruct
	public void initialize() {
		this.loginDao = new LoginDao();
	}
	
	@Override
	public Map<String, Object> listarRolesByNickname(String nickname) {
		List<RolDto> roles=loginDao.getRolesByNickname(nickname);
		Map<String,Object> request=new HashMap<String, Object>();
		request.put("roles", roles);
		return request;
	}
	@Override
	public Map<String, Object> identityUser(String nickname,String password) {
		//login interno de sistema
		UserDto usuario=loginDao.identityUser(nickname,password);
		if(usuario.getId()==0)
		{
			throw new NullPointerException();
		}
		//login de camunda
		UserCamundaDto user=new UserCamundaDto();
		user.setIdUsuario(nickname);
		user.setPassword(password);
		Map<String,Object> response=new HashMap<String, Object>();
		if(camundaApi.verificarPassword(user))
		{
			SessionDto session=new SessionDto();
			session.setJwt(TokenHandler.getInstance().createTokenForUser(usuario));
			session.setUsuario(usuario);
			response.put("permisos", session);
		} else
		{
			throw new NullPointerException();
		}
		return response;
	}
	@Override
	public boolean isValidAuthentication(String tokenRequest) {
		return (new TokenAuthentication()).isValidAuthentication(tokenRequest);
	}
	
	
}
