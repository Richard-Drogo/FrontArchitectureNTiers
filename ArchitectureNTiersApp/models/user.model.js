module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
	password: {
		type: Sequelize.STRING
	}
  });

  return User;
};




// TODO
/*
    @OneToMany(mappedBy="intern", fetch = FetchType.EAGER, cascade={CascadeType.ALL}, orphanRemoval=true)
    @JsonIgnoreProperties("intern")
    @EqualsAndHashCode.Exclude
    private Set<Internship> internships;
*/