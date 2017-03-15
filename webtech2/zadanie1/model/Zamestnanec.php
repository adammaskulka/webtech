<?php

class Zamestnanec
{
    protected $id, $name, $surname;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return mixed
     */
    public function getSurname()
    {
        return $this->surname;
    }

    public function getFullName()
    {
        return $this->name . ' ' . $this->surname;
    }

}
