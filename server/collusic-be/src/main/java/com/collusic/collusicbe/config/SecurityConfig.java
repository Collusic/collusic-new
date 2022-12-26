package com.collusic.collusicbe.config;

import com.collusic.collusicbe.config.auth.ExceptionHandlerFilter;
import com.collusic.collusicbe.config.auth.JWTAuthenticationFilter;
import com.collusic.collusicbe.config.auth.JWTAuthenticationProvider;
import com.collusic.collusicbe.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JWTAuthenticationProvider jwtAuthenticationProvider;
    private final AuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final TokenService tokenService;
    private final ExceptionHandlerFilter exceptionHandlerFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin().disable()
                .logout().disable()
                .authorizeRequests(request -> request.antMatchers(HttpMethod.POST, "/members").permitAll()
                                                     .antMatchers(HttpMethod.GET, "/oauth2/login/{provider}", "/members/{nickname}").permitAll()
                                                     .antMatchers("/swagger-ui/**", "/swagger-resources/**", "/v3/api-docs").permitAll()
                                                     .antMatchers(HttpMethod.GET, "/projects/**").permitAll()
                                                     .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                                     .antMatchers(HttpMethod.GET,"http://api.collusic.com/.well-known/acme-challenge/{token}").permitAll()
                                                     .antMatchers(HttpMethod.POST,"http://api.collusic.com/.well-known/acme-challenge/{token}").permitAll()
                                                     .anyRequest().authenticated())
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and()
                .addFilterAt(new JWTAuthenticationFilter(authenticationManager(), tokenService), BasicAuthenticationFilter.class)
                .addFilterBefore(exceptionHandlerFilter, JWTAuthenticationFilter.class);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
           .requestMatchers(PathRequest.toStaticResources().atCommonLocations())
           .antMatchers("/h2-console/**");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(jwtAuthenticationProvider);
    }
}